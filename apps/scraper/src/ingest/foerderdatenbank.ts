import { FundingOpportunity } from '@prisma/client';
import foerderdatenbank from '@funding-database/foerderdatenbank-scraper';
import db from '@funding-database/db';

export const handleFoerderdatenbankData = async () => {
  const foerderdatenbankResults = await foerderdatenbank.scrape();

  const rows: Omit<FundingOpportunity, 'id'>[] = foerderdatenbankResults

    .filter((result) => result.title !== undefined)
    .map((result) => {
      return {
        hasEmbedding: false,
        url: result.url,
        createdAt: new Date(),
        updatedAt: new Date(),
        startAt: null,
        deadlineAt: null,
        deletedAt: null,
        description: result.description,
        descriptionSummary: null,
        issuer: result.meta['issuer'] ?? 'Unknown issuer',
        meta: JSON.stringify(result),
        targetGroup: result.meta['Förderberechtigte'] ?? '',
        title: result.title,
        type: 'FOERDERDATENBANK',
      };
    });

  await db.fundingOpportunity.createMany({
    data: rows,
    skipDuplicates: true,
  });
};
