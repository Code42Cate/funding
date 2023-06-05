import { NextApiRequest, NextApiResponse } from 'next';
import db from '@funding-database/db';
import { Configuration, OpenAIApi } from 'openai';
import { Prisma } from '@prisma/client';

export type GetFundingOpportunitiesResponse = {
  hits: FundingResult[];
};

type FundingResult = {
  id: number;
  title: string;
  description: string;
  url: string;
  meta: any;
  descriptionSummary: null | string;
  issuer: string;
  type: 'FOERDERDATENBANK' | 'EU' | 'DAAD';
};

export type SelectedFilters = {
  [key: string]: string[];
};

type FundingResultRaw = {
  id: number;
  title: string;
  description: string;
  url: string;
  meta: any;
  description_summary: null | string;
  issuer: string;
  type: 'FOERDERDATENBANK' | 'EU' | 'DAAD';
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const validateFilters = (filters: SelectedFilters) => {
  if (filters['source'] && filters['source'].length > 0) {
    if (!['FOERDERDATENBANK', 'EU', 'DAAD'].includes(filters['source'][0])) {
      return false;
    }
  }

  return true;
};

const openai = new OpenAIApi(configuration);

export default async function funding(req: NextApiRequest, res: NextApiResponse<GetFundingOpportunitiesResponse>) {
  if (req.method === 'GET') {
    const search = String(req.query.search) || '';
    const filters: SelectedFilters = req.query.filters ? JSON.parse(String(req.query.filters)) : {};

    if (!validateFilters(filters)) {
      res.status(400).end();
      return;
    }

    // create embedding for the search
    const openaiRes = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: search,
    });

    const embedding = JSON.stringify(openaiRes.data.data[0].embedding);

    const start = Date.now();

    let items: FundingResultRaw[] = [];

    if (filters['source']) {
      const sources = filters['source'].map((source) => Prisma.sql`${source}::text`);
      items =
        await db.$queryRaw`SELECT id, title, url, type, meta, issuer, description, description_summary AS description_summary, embedding::text FROM funding_opportunities WHERE funding_opportunities.type IN (${Prisma.join(
          sources
        )}) ORDER BY embedding <-> ${embedding}::vector LIMIT 1`;
    } else {
      items =
        await db.$queryRaw`SELECT id, title, url, type, meta, issuer, description, description_summary AS description_summary, embedding::text FROM funding_opportunities ORDER BY embedding <-> ${embedding}::vector LIMIT 1`;
    }

    console.log(`Search took ${Date.now() - start}ms`);

    const data = items.map((item, index) => {
      return {
        ...item,
        meta: JSON.parse(item.meta),
        embedding: undefined,
        descriptionSummary: item.description_summary,
      };
    });

    res.status(200).json({ hits: data });
  }
}
