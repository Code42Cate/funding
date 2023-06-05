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

const sanitizeFilters = (filters: SelectedFilters) => {
  if (!filters['source']) {
    filters['source'] = ['FOERDERDATENBANK', 'EU', 'DAAD'];
  }

  return filters;
};

const openai = new OpenAIApi(configuration);

export default async function funding(req: NextApiRequest, res: NextApiResponse<GetFundingOpportunitiesResponse>) {
  const x = await db.fundingOpportunity.findMany({
    select: {
      meta: true,
    },
    where: {
      type: 'FOERDERDATENBANK',
    },
  });

  const gebiete = new Set<string>();

  x.forEach((item) => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const data = JSON.parse(item.meta ?? '{}');
    data['meta']?.['Förderberechtigte']?.split(', ').map((gebiet: string) => gebiete.add(gebiet));
  });

  gebiete.forEach((gebiet) => {
    console.log(JSON.stringify({ value: gebiet, label: gebiet }) + ',');
  });

  if (req.method === 'GET') {
    const search = String(req.query.search) || '';
    let filters: SelectedFilters = req.query.filters ? JSON.parse(String(req.query.filters)) : {};

    if (!validateFilters(filters)) {
      res.status(400).end();
      return;
    }

    filters = sanitizeFilters(filters);

    // create embedding for the search
    const openaiRes = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: search,
    });

    const embedding = JSON.stringify(openaiRes.data.data[0].embedding);

    const sources = filters['source'].map((source) => Prisma.sql`${source}::text`);

    const items: FundingResultRaw[] =
      await db.$queryRaw`SELECT id, title, url, type, meta, issuer, description, description_summary AS description_summary, embedding::text FROM funding_opportunities WHERE funding_opportunities.type IN (${Prisma.join(
        sources
      )}) ORDER BY embedding <-> ${embedding}::vector LIMIT 1`;

    const data = items.map((item) => {
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
