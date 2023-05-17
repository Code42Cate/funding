import { Logger } from '@funding-database/logger';
import { JSDOM } from 'jsdom';
import { throttleAll } from 'promise-throttle-all';

const logger = Logger('foerderdatenbank-scraper');

const downloadAsText = async (url: string) => fetch(url).then((res) => res.text());

const getJsdom = async (url: string) => {
  const html = await downloadAsText(url);
  return new JSDOM(html);
};

export const scrape = async () => {
  let url =
    'https://www.foerderdatenbank.de/SiteGlobals/FDB/Forms/Suche/Foederprogrammsuche_Formular.html?pageLocale=de&filterCategories=FundingProgram&templateQueryString=&submit=Suchen';

  const entryUrls: string[] = [];

  const startDate = new Date();
  while (url) {
    const jsdom = await getJsdom(url);

    // find all elements with card--title class and extract href from a tag
    const resultLinks = Array.from(jsdom.window.document.querySelectorAll('.card--title a')).map((a) =>
      a.getAttribute('href')
    );

    logger.info(`found ${resultLinks.length} result links`);

    entryUrls.push(...resultLinks.map((link) => `https://www.foerderdatenbank.de/${link}`));

    url = extractNextPage(jsdom);
  }

  const endDate = new Date();

  logger.info(`found ${entryUrls.length} entry urls in ${endDate.getTime() - startDate.getTime()}ms`);

  const entries = await throttleAll<FoerderdatenbankEntry>(
    20,
    entryUrls.map((entryUrl) => () => scrapeEntry(entryUrl))
  );

  // filter successful results
  const scrapedEntries = entries.filter((entry) => entry);

  return scrapedEntries;
};

type FoerderdatenbankEntry = {
  url: string;
  title: string;
  meta: Record<string, string>;
  issuer?: string;
  description: string;
};

const scrapeEntry = async (entryUrl: string) => {
  const jsdom = await getJsdom(entryUrl);

  const title = jsdom.window.document.querySelector('h1')?.textContent?.trim();

  // all dt and dd elements
  const contentTitle = Array.from(jsdom.window.document.querySelectorAll('dt'));
  const contentValue = Array.from(jsdom.window.document.querySelectorAll('dd'));

  const meta = contentTitle.reduce((acc, dt, idx) => {
    const key = dt.textContent?.trim().replace(':', '');
    const value = contentValue[idx].textContent?.trim();

    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  const tabs = Array.from(jsdom.window.document.querySelectorAll('article.content--tab-text'));
  const tabOpeners = Array.from(jsdom.window.document.querySelectorAll('h2.horizontal--tab-opener'));

  const tabContent = tabOpeners.reduce((acc, opener, idx) => {
    const key = opener.textContent?.trim();
    const value = tabs[idx].innerHTML;

    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  if (meta['Ansprechpunkt']) {
    // find card--title element in dd
    const issuer = jsdom.window.document.querySelector('dd .card--title')?.textContent?.trim();
    meta['issuer'] = issuer;
  }

  // add tabs to meta
  meta['tabs'] = JSON.stringify(tabContent);

  if (Object.keys(tabContent).length === 0) {
    tabContent['Kurzzusammenfassung'] = jsdom.window.document.querySelector('.rich--text')?.innerHTML;
  }

  const entry: FoerderdatenbankEntry = {
    url: entryUrl,
    title: title ?? '',
    meta,
    issuer: meta['issuer'],
    description: tabContent['Kurzzusammenfassung'],
  };

  return entry;
};

const extractNextPage = (jsdom: JSDOM) => {
  const nextPageRefRel = jsdom.window.document.querySelector('.pagination li:last-child a')?.getAttribute('href');
  const nextPageRefAbs = nextPageRefRel ? `https://www.foerderdatenbank.de/${nextPageRefRel}` : undefined;

  return nextPageRefAbs;
};
