import { NextApiRequest, NextApiResponse } from 'next';
import db from '@funding-database/db';
import { encode } from 'gpt-tokenizer';

export default async function cost(req: NextApiRequest, res: NextApiResponse) {
  const allDescriptions = await db.fundingOpportunity.findMany({
    select: {
      description: true,
    },
  });

  let tokenCount = 0;

  for (const { description } of allDescriptions) {
    const tokens = encode(description);
    tokenCount += tokens.length;
  }

  const outputTokens = 1024 * allDescriptions.length;

  tokenCount += outputTokens;

  const round = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

  const davinciCost = round((tokenCount / 1000) * 0.02);
  const adaCost = round((tokenCount / 1000) * 0.0004);
  const babbageCost = round((tokenCount / 1000) * 0.0005);
  const curieCost = round((tokenCount / 1000) * 0.002);

  // round to 2 decimals

  res.json({ davinciCost, adaCost, babbageCost, curieCost, tokenCount });
}
