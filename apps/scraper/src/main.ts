import daad from '@funding-database/daad-scraper';
import eu from '@funding-database/eu-scraper';
import db from '@funding-database/db';
import foerderdatenbank from '@funding-database/foerderdatenbank-scraper';
import { Configuration, OpenAIApi } from 'openai';

import minimist from 'minimist';
import { FundingOpportunity } from '@prisma/client';
import { throttleAll } from 'promise-throttle-all';

const allScraperNames = ['daad', 'eu-tenders', 'foerderdatenbank'];
const isValidScraper = (v: unknown): v is 'string' => typeof v === 'string' && allScraperNames.includes(v);

const main = async () => {
  // use minimist to parse the command line arguments
  const args = minimist(process.argv.slice(2));

  // --scraper=scraperName,scraperName or all scrapers as default
  const scraperNames = args.scraper?.split(',') ?? allScraperNames;

  // TODO:
  await Promise.allSettled(
    scraperNames.filter(isValidScraper).map((scraperName: string) => {
      // if (scraperName === 'daad') return daad.scrape();
      // if (scraperName === 'eu-tenders') return eu.scrape();
      // if (scraperName === 'foerderdatenbank') return;
    })
  );

  await createEmbeddings();
  console.log('Done!');
};

main();

const createEmbeddings = async () => {
  // get all rows from the database
  const rows = await db.fundingOpportunity.findMany({
    where: {
      deletedAt: null,
      hasEmbedding: false,
    },
  });

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  let totalTokens = 0;
  // for each row, create embedding for the description
  const updates = await throttleAll(
    20,
    rows.map((row) => async () => {
      try {
        const description = row.description ?? '';

        const res = await openai.createEmbedding({
          model: 'text-embedding-ada-002',
          input: description,
        });

        // parse the response
        totalTokens += res.data.usage.total_tokens;

        const embedding = JSON.stringify(res.data.data[0].embedding);

        // update the row in the database and also set has_embedding to true
        // await db.$executeRaw`UPDATE "funding_opportunities" SET embedding = ${embedding}::vector WHERE id = ${row.id}`;
        await db.$executeRaw`UPDATE "funding_opportunities" SET embedding = ${embedding}::vector, has_embedding = true WHERE id = ${row.id}`;
        return embedding;
      } catch (error) {
        console.log(error);
      }
    })
  );

  console.log('Total tokens:', totalTokens);
  console.log('Cost:', (totalTokens / 1000) * 0.0004);
};

const euScraper = async () => {
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

const daadScraper = async () => {
  const daadResults = await daad.scrape();

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

  // DRO

  await db.fundingOpportunity.createMany({
    data: rows,
    skipDuplicates: true,
  });
};

const foerderdatenbankScraper = async () => {
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
