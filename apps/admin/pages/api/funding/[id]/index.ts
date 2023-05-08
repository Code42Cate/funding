import { NextApiRequest, NextApiResponse } from 'next';

import { getFundingOpportunity } from '../../../../db/fundingOpportunities';
import { FundingOpportunity } from '@prisma/client';

export type GetFundingOpportunityResponse = FundingOpportunity;

export default async function funding(req: NextApiRequest, res: NextApiResponse<GetFundingOpportunityResponse>) {
  if (req.method === 'GET') {
    const id = Number(req.query.id) || 1;

    const fundingOpportunity = await getFundingOpportunity(id, false);

    res.status(200).json(fundingOpportunity);
  }
}
