import db from '@funding-database/db';
import { Configuration, OpenAIApi } from 'openai';
import { throttleAll } from 'promise-throttle-all';
import { encode, decode } from 'gpt-tokenizer';

export const createEmbeddings = async () => {
  // get all rows from the database
  const rows = await db.fundingOpportunity.findMany({
    where: {
      deletedAt: null,
      hasEmbedding: false,
    },
  });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let totalTokens = 0;
  // for each row, create embedding for the description
  await throttleAll(
    20,
    rows.map((row) => async () => {
      try {
        const description = row.description ?? '';

        const res = await openai.createEmbedding({
          model: 'text-embedding-ada-002',
          input: decode(encode(description).slice(0, 4097)),
        });

        // parse the response
        totalTokens += res.data.usage.total_tokens;

        const embedding = JSON.stringify(res.data.data[0].embedding);

        // update the row in the database and also set has_embedding to true
        // await db.$executeRaw`UPDATE "funding_opportunities" SET embedding = ${embedding}::vector WHERE id = ${row.id}`;
        await db.$executeRaw`UPDATE "funding_opportunities" SET embedding = ${embedding}::vector, has_embedding = true WHERE id = ${row.id}`;
        return embedding;
      } catch (error) {
        console.log(error);
        return null;
      }
    })
  );

  console.log('Total tokens:', totalTokens);
  console.log('Cost:', (totalTokens / 1000) * 0.0004);
};
