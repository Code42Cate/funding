import daad from '@funding-database/daad-scraper';
import eu from '@funding-database/eu-scraper';

import minimist from 'minimist';

const allScraperNames = ['daad', 'eu-tenders', 'foerderdatenbank'];
const isValidScraper = (v: unknown): v is 'string' =>
  typeof v === 'string' && allScraperNames.includes(v);

const main = async () => {
  // use minimist to parse the command line arguments
  const args = minimist(process.argv.slice(2));

  // --scraper=scraperName,scraperName or all scrapers as default
  const scraperNames = args.scraper?.split(',') ?? allScraperNames;

  // TODO:
  await Promise.allSettled(
    scraperNames.filter(isValidScraper).map((scraperName: string) => {
      // if (scraperName === 'daad') return daad.scrape();
      if (scraperName === 'eu-tenders') return eu.scrape();
      // if (scraperName === 'foerderdatenbank') return;
    })
  );

  console.log('Done!');
};

main();
