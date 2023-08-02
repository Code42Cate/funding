import { FundingOpportunity } from '@prisma/client';
import eu from '@funding-database/eu-scraper';
import db from '@funding-database/db';

export const handleEuData = async (euTendersResults: Awaited<ReturnType<typeof eu.scrape>>): Promise<void> => {
  // @ts-expect-error TODO: fix this
  const rows: Omit<FundingOpportunity, 'id'>[] = euTendersResults
    .filter((result) => result.topic?.description !== undefined)
    .map((result) => {
      return {
        url: `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/${result.metadata.identifier?.[0].toLowerCase()}`,
        title: result.topic?.callTitle ?? result.topic?.title ?? result.metadata.title?.[0] ?? 'Unknown title',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        descriptionSummary: undefined,
        hasEmbedding: false,
        targetGroup: '',
        issuer:
          result.topic?.programmeDivision?.[0]?.abbreviation ??
          result.metadata.programmeDivision?.[0] ??
          'Unknown issuer',
        type: 'EU',
        startAt: new Date(result.metadata.startDate?.[0]),
        deadlineAt: new Date(result.metadata.deadlineDate?.[0]),
        description: result.topic?.description ?? '',
        meta: result,
      };
    });

  const insertResult = await db.fundingOpportunity.createMany({
    data: rows,
    skipDuplicates: true,
  });

  console.log(`Inserted ${insertResult.count} EU funding opportunities`);

  const urls = rows.map((row) => row.url);

  // soft delete all rows that are not in the scraped data
  await db.fundingOpportunity.updateMany({
    data: {
      deletedAt: new Date(),
    },
    where: {
      url: {
        notIn: urls,
      },
      type: 'EU',
    },
  });
};
