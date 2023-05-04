// nextjs api route for funding

import { NextApiRequest, NextApiResponse } from 'next';

import db from '@funding-database/db';

export default async function funding(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const funding = await db.fundingOpportunity.findMany({});

    res.status(200).json({ funding });
  }
}
