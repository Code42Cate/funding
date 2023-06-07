import daad from '@funding-database/daad-scraper';
import eu from '@funding-database/eu-scraper';
import foerderdatenbank from '@funding-database/foerderdatenbank-scraper';

import { handleDaadData, handleEuData, handleFoerderdatenbankData } from './ingest';

const start = new Date();

Promise.allSettled([
  daad.scrape().then(handleDaadData),
  eu.scrape().then(handleEuData),
  foerderdatenbank.scrape().then(handleFoerderdatenbankData),
])
  .then(() => {
    console.log(`Scraping took ${Math.round((new Date().getTime() - start.getTime()) / 1000)} seconds`);
  })
  .catch((error) => {
    console.log(error);
  });
