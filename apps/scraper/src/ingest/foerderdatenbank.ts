import { FundingOpportunity } from '@prisma/client';
import foerderdatenbank from '@funding-database/foerderdatenbank-scraper';
import db from '@funding-database/db';

export const handleFoerderdatenbankData = async (
  foerderdatenbankResults: Awaited<ReturnType<typeof foerderdatenbank.scrape>>
): Promise<void> => {
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
        meta: result,
        targetGroup: result.meta['Förderberechtigte'] ?? '',
        title: result.title,
        type: 'FOERDERDATENBANK',
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
      type: 'FOERDERDATENBANK',
    },
  });
};
