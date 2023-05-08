import { NextApiRequest, NextApiResponse } from 'next';

import { countFundingOpportunities, getFundingOpportunities } from '../../../db/fundingOpportunities';
import { FundingOpportunity } from '@prisma/client';

export type GetFundingOpportunitiesResponse = {
  fundingOpportunities: Omit<FundingOpportunity, 'meta' | 'description' | 'descriptionSummary'>[];
  total: number;
  pageSize: number;
};

const PAGE_SIZE = 10;

export default async function funding(req: NextApiRequest, res: NextApiResponse<GetFundingOpportunitiesResponse>) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || 1;
    const search = String(req.query.search) || '';

    const fundingOpportunities = await getFundingOpportunities(page, PAGE_SIZE);

    const count = await countFundingOpportunities();

    res.status(200).json({ fundingOpportunities, total: count, pageSize: PAGE_SIZE });
  }
}
