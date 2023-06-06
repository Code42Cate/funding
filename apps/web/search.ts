import { Prisma } from '@prisma/client';
import { SelectedFilters } from './filters';
import { getEmbedding } from './openai';
import db from '@funding-database/db';

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

export const findBestMatch = async (search: string, filters: SelectedFilters) => {
  // create embedding for the search
  const embedding = await getEmbedding(search);

  const sources = filters['source'].map((source) => Prisma.sql`${source}::text`);
  const sourcesWithoutFoerderdatenbank = filters['source']
    .filter((source) => source !== 'FOERDERDATENBANK')
    .map((source) => Prisma.sql`${source}::text`);

  if (sourcesWithoutFoerderdatenbank.length === 0) sourcesWithoutFoerderdatenbank.push(Prisma.sql`'DONT_REMOVE_ME'`);

  let items: FundingResultRaw[] = [];

  if (filters['source'].includes('FOERDERDATENBANK')) {
    items = await db.$queryRaw`
 SELECT id, title, url, type, meta, issuer, description, description_summary AS description_summary, embedding::text
 FROM funding_opportunities
 WHERE (funding_opportunities.type = 'FOERDERDATENBANK'
   AND EXISTS
     (SELECT 1
      FROM unnest(STRING_TO_ARRAY(meta->'meta'->>'Förderart', ',')) AS fa
      WHERE fa LIKE ANY (ARRAY[${Prisma.join(filters['funding-type'].map((t) => Prisma.sql`${t}`))}]) )
   AND EXISTS
     (SELECT 1
      FROM unnest(STRING_TO_ARRAY(meta->'meta'->>'Fördergebiet', ',')) AS fg
      WHERE fg LIKE ANY (ARRAY[${Prisma.join(filters['location'].map((t) => Prisma.sql`${t}`))}]) )
   AND EXISTS
     (SELECT 1
      FROM unnest(STRING_TO_ARRAY(target_group, ',')) AS tg
      WHERE tg LIKE ANY (ARRAY[${Prisma.join(
        filters['target-group'].map((t) => Prisma.sql`${t}`)
      )}]) )) OR funding_opportunities.type IN (${Prisma.join(sourcesWithoutFoerderdatenbank)})
 ORDER BY embedding <-> ${embedding}::vector LIMIT 1
       `;
  } else {
    items =
      await db.$queryRaw`SELECT id, title, url, type, meta, issuer, description, description_summary AS description_summary, embedding::text FROM funding_opportunities WHERE funding_opportunities.type IN (${Prisma.join(
        sources
      )}) ORDER BY embedding <-> ${embedding}::vector LIMIT 1`;
  }

  return items[0] as FundingResultRaw | null;
};

export const saveSearchResult = async (search: string, matchId: number) => {
  const result = await db.result.create({
    data: {
      query: search,
      fundingOpportunityId: matchId,
    },
    select: {
      id: true,
    },
  });

  return result.id;
};
