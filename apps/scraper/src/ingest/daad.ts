import { Scholarship } from '@funding-database/daad-scraper';
import { FundingOpportunity } from '@prisma/client';
import db from '@funding-database/db';

export const handleDaadData = async (daadResults: Scholarship[]) => {
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
        meta: JSON.stringify(result),
        targetGroup: '',
        title: result.title,
        type: 'DAAD',
      };
    });

  await db.fundingOpportunity.createMany({
    data: rows,
    skipDuplicates: true,
  });
};
