import { writeFileSync } from 'fs';

const FORTHCOMING_STATUS = '31094501';
const OPEN_STATUS = '31094502';

const TENDER_TYPE = '0';
const GRANT_TYPE = '1';
const CALL_FOR_PROPOSAL_TYPE = '2';
const CASCADE_FUNDING_TYPE = '8';

const query = {
  bool: {
    must: [
      {
        terms: {
          type: [TENDER_TYPE, GRANT_TYPE, CALL_FOR_PROPOSAL_TYPE, CASCADE_FUNDING_TYPE],
        },
      },
      { terms: { status: [FORTHCOMING_STATUS, OPEN_STATUS] } },
    ],
  },
};

export const scrape = async () => {
  const form = new FormData();

  const queryBlob = new Blob([JSON.stringify(query)], {
    type: 'application/json',
  });

  form.append('query', queryBlob, '');

  let pageNumber = 1;
  const pageSize = 1000;
  let totalResults = pageSize + 1;

  const results: Result[] = [];

  while (pageNumber * pageSize < totalResults + pageSize) {
    const res = await fetch(
      `https://api.tech.ec.europa.eu/search-api/prod/rest/search?apiKey=SEDIA&text=***&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        method: 'POST',
        body: form,
      }
    );

    const data: Root = await res.json();

    totalResults = data.totalResults;

    results.push(...data.results);

    console.log('Fetching page ' + pageNumber + ' of ' + Math.ceil(totalResults / pageSize) + ' pages');
    pageNumber++;
  }

  // dump results to file

  const json = JSON.stringify(results, null, 2);
  writeFileSync('eu.json', json, 'utf8');
};

export interface Root {
  apiVersion: string;
  terms: string;
  responseTime: number;
  totalResults: number;
  pageNumber: number;
  pageSize: number;
  sort: string;
  groupByField: unknown;
  queryLanguage: QueryLanguage;
  spellingSuggestion: unknown;
  bestBets: unknown[];
  results: Result[];
  warnings: unknown[];
}

export interface QueryLanguage {
  language: string;
  probability: number;
}

export interface Result {
  apiVersion: string;
  reference: string;
  url: string;
  title: any;
  contentType: string;
  language: string;
  databaseLabel: string;
  database: string;
  summary: any;
  weight: number;
  groupById: string;
  content: string;
  accessRestriction: boolean;
  pages: any;
  checksum?: string;
  metadata: Metadata;
  children: any[];
}

export interface Metadata {
  beneficiaryAdministration?: string[];
  sortStatus: string[];
  description?: string[];
  type: string[];
  title: string[];
  duration?: string[];
  esST_FileName: string[];
  ccm2Id: string[];
  callccm2Id: string[];
  projectAcronym?: string[];
  frameworkProgramme: string[];
  budget?: string[];
  identifier: string[];
  caName?: string[];
  furtherInformation?: string[];
  es_ContentType: string[];
  deadlineDate: string[];
  esDA_IngestDate: string[];
  closingDate?: string[];
  esST_URL: string[];
  esDA_QueueDate: string[];
  projectName?: string[];
  projectId?: string[];
  startDate: string[];
  status: string[];
  deadlineModel: string[];
  es_SortDate?: string[];
  keywords?: string[];
  destination?: string[];
  focusArea?: any[];
  cftId?: string[];
  typeOfMGAs?: string[];
  callIdentifier?: string[];
  destinationGroup?: string[];
  programmeDivision?: string[];
  crossCuttingPriorities?: string[];
  programmePeriod?: string[];
  typesOfAction?: string[];
  mission?: string[];
  missionGroup?: string[];
  esST_checksum?: string[];
}
