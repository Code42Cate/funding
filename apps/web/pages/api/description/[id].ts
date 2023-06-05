import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai-streams/node';
import db from '@funding-database/db';
import { FundingOpportunity } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return {
      notFound: true,
    };
  }

  const fundingOpportunity = await getFundingOpportunity(id);
  if (!fundingOpportunity) {
    return {
      notFound: true,
    };
  }

  const stream = await OpenAI('completions', {
    model: 'text-davinci-003',
    prompt: fundingOpportunity.description + '\n\nSummarize the above description:',
    max_tokens: 1024,
  });

  const buffer: any = [];
  stream.on('data', (chunk) => {
    buffer.push(chunk);
    res.write(chunk);
  });

  await new Promise((resolve) => {
    stream.on('end', async () => {
      res.end();
      const result = Buffer.concat(buffer).toString();
      await saveGptDescription(id, result);
      resolve(true);
    });
  });
}

const getFundingOpportunity = async (id: number, withoutMeta = true): Promise<FundingOpportunity | null> => {
  const fundingOpportunity = await db.fundingOpportunity.findUnique({
    where: {
      id,
    },
    select: {
      createdAt: true,
      updatedAt: true,
      deadlineAt: true,
      deletedAt: true,
      issuer: true,
      startAt: true,
      targetGroup: true,
      title: true,
      type: true,
      id: true,
      url: true,
      descriptionSummary: true,
      description: true,
      meta: !withoutMeta,
      hasEmbedding: true,
    },
  });

  return fundingOpportunity;
};

const saveGptDescription = async (id: number, descriptionSummary: string): Promise<void> => {
  await db.fundingOpportunity.update({
    where: {
      id,
    },
    data: {
      descriptionSummary,
    },
  });
};
