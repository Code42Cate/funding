import daad from '@funding-database/daad-scraper';
import eu from '@funding-database/eu-scraper';
import db from '@funding-database/db';

import minimist from 'minimist';
import { FundingOpportunity, Prisma } from '@prisma/client';

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

  const euTendersResults = await eu.scrape();

  const rows: FundingOpportunity[] = euTendersResults
    .filter((result) => result.topic?.description !== undefined)
    .map((result) => {
      return {
        url: `https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/${result.metadata.identifier?.[0].toLowerCase()}`,
        title: result.topic?.callTitle ?? result.topic?.title ?? result.metadata.title?.[0] ?? 'Unknown title',

        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,

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

  console.log(rows);

  console.log('Done!');
};

main();
