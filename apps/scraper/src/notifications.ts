import db from '@funding-database/db';
import { sendNotificationEmail } from '@funding-database/notifications';
import { FundingOpportunity } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

export const checkForNewMatches = async (addedAfter: Date) => {
  const allNotifications = await db.notification.findMany({});

  for (const notification of allNotifications) {
    const embedding = await getEmbedding(notification.query);

    const items: FundingOpportunity[] =
      await db.$queryRaw`SELECT id, title, url, type, meta, issuer, description, description_summary AS description_summary, embedding::text FROM funding_opportunities WHERE deleted_at IS NULL AND created_at > ${addedAfter}::date ORDER BY embedding <-> ${embedding}::vector LIMIT 1`;

    if (items.length === 0) continue;

    const bestGuess = items[0];

    sendNotificationEmail(notification.email, notification.query, bestGuess.url, bestGuess.title);

    await db.notificationHistory.create({
      data: {
        notificationId: notification.id,
        fundingOpportunityId: bestGuess.id,
      },
    });
  }
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getEmbedding = async (text: string) => {
  const openaiRes = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: text,
  });

  return openaiRes.data.data[0].embedding ? JSON.stringify(openaiRes.data.data[0].embedding) : null;
};
