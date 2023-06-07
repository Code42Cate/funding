import { FundingOpportunity } from '@prisma/client';
import eu from '@funding-database/eu-scraper';
import db from '@funding-database/db';

export const handleEuData = async () => {
  const euTendersResults = await eu.scrape();

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

        meta: JSON.stringify(result),
      };
    });

  await db.fundingOpportunity.createMany({
    data: rows,
    skipDuplicates: true,
  });
};
