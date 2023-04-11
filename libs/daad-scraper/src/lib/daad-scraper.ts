import { writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { Logger } from '@funding-database/logger';

const logger = Logger('daad-scraper');

const url = (detailId: number) =>
  `https://www2.daad.de/deutschland/stipendium/datenbank/de/21148-stipendiendatenbank/?status=&origin=&subjectGrps=&daad=&intention=&q=&page=1&detail=${detailId}&back=1`;

const BASE_URL =
  'https://www2.daad.de/deutschland/stipendium/datenbank/de/21148-stipendiendatenbank/?status=&origin=&subjectGrps=&daad=&intention=&q=&page=1&back=1';

const downloadAsText = async (url: string) =>
  fetch(url).then((res) => res.text());

export const scrape = async () => {
  logger.info(`starting scraper, trying to find database url from ${BASE_URL}`);

  let html = '';
  try {
    html = await downloadAsText(BASE_URL);
  } catch (error) {
    logger.error(`error while downloading ${BASE_URL}: ${error}`);
    return;
  }

  // find script that includes scholarships.js in src tag, then exctract src
  const script = new JSDOM(html).window.document.querySelector(
    'script[src*="scholarships.js"]'
  );

  const src = script?.getAttribute('src');
  const dbUrl = new URL(src, 'https://www2.daad.de');

  logger.info(`found script tag with database url: ${dbUrl}`);

  // db is a js file that basically just has one big hardcoded object with all the scholarships in it
  // print dbUrl and navigate to it in the browser if you want to see what it looks like
  // we're parsing this with regex because i don't want to eval some random js file :)
  let db = '';
  try {
    db = await downloadAsText(dbUrl.toString());
  } catch (error) {
    logger.error(`error while downloading ${dbUrl}: ${error}`);
    return;
  }

  const regex = /"sapProgid":\s*(\d+)/g;
  const scholarshipIds: number[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(db))) {
    scholarshipIds.push(parseInt(match[1]));
  }

  logger.info(`found ${scholarshipIds.length} scholarships`);

  if (scholarshipIds.length === 0) {
    logger.error(`no scholarships found`);
    return;
  }

  logger.info(`starting to fetch details for scholarships`);
  const entries = await Promise.allSettled(
    scholarshipIds.map((id) => getScholarship(id))
  );

  const countFailed = entries.filter(
    (entry) => entry.status === 'rejected'
  ).length;

  logger.info(`finished fetching details for scholarships`);
  if (countFailed > 0)
    logger.info(`failed to fetch details for ${countFailed} scholarships`);

  logger.info(`writing scholarships to scholarships.json`);
  // write to file
  writeFileSync(
    'scholarships.json',
    JSON.stringify(
      entries.filter((entry) => entry.status === 'fulfilled'),
      null,
      2
    )
  );

  logger.info(`finished`);
};

const getScholarship = async (id: number) => {
  const detailHtml = await downloadAsText(url(id));

  // title is h2 with class title
  const title = new JSDOM(detailHtml).window.document.querySelector(
    'h2.title'
  )?.textContent;

  // get div with id ueberblick, then remove all children with class invisible-print
  const detail = new JSDOM(detailHtml).window.document.querySelector(
    '#ueberblick'
  );

  if (detail) {
    detail.querySelectorAll('.invisible-print').forEach((el) => el.remove());
    detail.querySelectorAll('.print-only').forEach((el) => el.remove());
  }

  // then parse each h3 and the following elements until the next h3 as a field
  const fields: { [key: string]: string } = {};

  // find index of all top-level h3s
  const h3s = Array.from(detail?.querySelectorAll('h3') ?? []);
  const h3Indices = h3s.map((el) =>
    Array.from(el.parentElement?.children ?? []).indexOf(el)
  );

  // for each h3 get all siblings until the next h3
  h3Indices.forEach((h3Index, i) => {
    const h3 = h3s[i];

    const nextH3Index = h3Indices[i + 1];

    const siblings = Array.from(h3.parentElement?.children ?? []).slice(
      h3Index + 1,
      nextH3Index
    );

    fields[h3.textContent ?? ''] = siblings
      .map((el) => el.textContent.trim())
      .join(' ');
  });

  return {
    fields,
    id,
    title,
  };
};
