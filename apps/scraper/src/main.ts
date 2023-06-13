import daad from '@funding-database/daad-scraper';
import eu from '@funding-database/eu-scraper';
import foerderdatenbank from '@funding-database/foerderdatenbank-scraper';

import { handleDaadData, handleEuData, handleFoerderdatenbankData } from './ingest';
import { createEmbeddings } from './embeddings';

const start = new Date();

const onlyEmbed = true;

// This is the main entrypoint for the scraper, if you want to do a partial scrape of only one data source, comment out the other ones.
// All are done concurrently and should be independent of each other.
Promise.allSettled(
  onlyEmbed
    ? []
    : [
        daad.scrape().then(handleDaadData),
        eu.scrape().then(handleEuData),
        foerderdatenbank.scrape().then(handleFoerderdatenbankData),
      ]
)
  .then(() => {
    console.log(`Scraping took ${Math.round((new Date().getTime() - start.getTime()) / 1000)} seconds`);

    const startEmbeddings = new Date();
    createEmbeddings().then(() => {
      console.log(`Embeddings took ${Math.round((new Date().getTime() - startEmbeddings.getTime()) / 1000)} seconds`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
