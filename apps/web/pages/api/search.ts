import { NextApiRequest, NextApiResponse } from 'next';
import { SelectedFilters, sanitizeFilters, validateFilters } from '../../filters';
import { findBestMatch, saveSearchResults } from '../../search';

export type FundingResultResponse = {
  match: {
    id: number;
    title: string;
    description: string;
    url: string;
    meta: any;
    descriptionSummary: null | string;
    issuer: string;
    type: 'FOERDERDATENBANK' | 'EU' | 'DAAD';
  };
  id: string;
};

export default async function funding(req: NextApiRequest, res: NextApiResponse<FundingResultResponse>) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }

  const search = String(req.query.search) || '';

  const filters: SelectedFilters = req.query.filters ? JSON.parse(String(req.query.filters)) : {};

  if (!validateFilters(filters)) {
    res.status(400).end();
    return;
  }

  const matches = await findBestMatch(search, sanitizeFilters(filters));
  if (!matches || matches.length === 0) {
    res.status(404).end();
    return;
  }

  const id = await saveSearchResults(
    search,
    matches.map((m) => m.id)
  );

  const match = matches[0];

  res.status(200).json({
    match: {
      description: match.description,
      descriptionSummary: match['description_summary'],
      id: match.id,
      issuer: match.issuer,
      meta: match.meta,
      title: match.title,
      type: match.type,
      url: match.url,
    },
    id,
  });
}
