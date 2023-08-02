import daad from '@funding-database/daad-scraper';
import { FundingOpportunity } from '@prisma/client';
import db from '@funding-database/db';

export const handleDaadData = async (daadResults: Awaited<ReturnType<typeof daad.scrape>>) => {
  const rows: Omit<FundingOpportunity, 'id'>[] = daadResults
    .filter((result) => result.title !== undefined)
    .map((result) => {
      return {
        url: `https://www2.daad.de/deutschland/stipendium/datenbank/de/21148-stipendiendatenbank/?detail=${result.id}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        hasEmbedding: false,
        startAt: null,
        deadlineAt: null,
        deletedAt: null,
        description: Object.entries(result.fields)
          .map(([key, value]) => `<span>${key}</span>\n <p>${value}</p>`)
          .join('\n'),
        descriptionSummary: null,
        issuer: result.title.includes(':') ? result.title.split(':')[0] : 'Unknown issuer',
        meta: result,
        targetGroup: '',
        title: result.title,
        type: 'DAAD',
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
      type: 'DAAD',
    },
  });
};
