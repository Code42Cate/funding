import { getFundingOpportunity, saveGptDescription } from '../../../../db/fundingOpportunities';
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai-streams/node';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return {
      notFound: true,
    };
  }

  const fundingOpportunity = await getFundingOpportunity(id);

  const stream = await OpenAI('completions', {
    model: 'text-davinci-003',
    prompt: fundingOpportunity.description + '\n\nSummarize the above description:',
    max_tokens: 256,
  });

  const buffer = [];
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
