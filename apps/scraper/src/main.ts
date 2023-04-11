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
  scraperNames.filter(isValidScraper).forEach((scraperName: string) => {
    console.log(`Running scraper: ${scraperName}`);
  });

  console.log('Done!');
};

main();
