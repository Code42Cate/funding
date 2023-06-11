import DescriptionInput from '../components/DescriptionInput';
import Header from '../components/Header';
import { useCallback, useEffect, useState } from 'react';
import { FundingResultResponse } from './api/search';
import Filter from '../components/Filter';
import { SelectedFilters } from '../filters';
import { useRouter } from 'next/router';
import ResultCard from '../components/ResultCard';
import { GetServerSideProps } from 'next';
import db from '@funding-database/db';
import Pagination from '../components/Pagination';

type Props = {
  existingMatch: FundingResultResponse['match'] | null;
  existingSearch: string | null;
};

const search = async (query: string, filters: SelectedFilters, page: number) => {
  const res = await fetch(
    `/api/search?search=${encodeURIComponent(query)}&filters=${encodeURIComponent(JSON.stringify(filters))}`
  );
  const json = await res.json();
  return json as FundingResultResponse;
};

export function Index({ existingMatch, existingSearch }: Props) {
  const [match, setMatch] = useState<FundingResultResponse['match'] | null>(null);
  const router = useRouter();

  const onSearch = async (v: string) => {
    const page = Number(router.query.page) || 1;

    const { match, id } = await search(v, selectedFilters, page);

    setMatch(match);
    router.push(`/?id=${id}`, undefined, { shallow: true });
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  const matchExists = existingMatch !== null || match !== null;

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-y-6 px-2 py-4 sm:mt-10">
      <Header />

      <DescriptionInput onSearch={onSearch} defaultValue={existingSearch} />

      <Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />

      {matchExists && <ResultCard match={existingMatch ?? match} />}
      {matchExists && <Pagination />}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let existingMatch: FundingResultResponse['match'] | null = null;
  let existingSearch: string | null = null;

  const page = Number(context.query.page) || 1;

  if (context.query.id) {
    const result = await db.result.findUnique({
      where: {
        id: context.query.id as string,
      },
    });
    if (result) {
      const opId = (result.fundingOpportunities as number[])[page - 1];
      console.log(opId);
      const fundingOpportunity = await db.fundingOpportunity.findFirst({
        where: {
          id: opId,
        },
      });
      existingSearch = result.query;
      if (fundingOpportunity) {
        existingMatch = {
          description: fundingOpportunity.description,
          descriptionSummary: fundingOpportunity.descriptionSummary,
          id: fundingOpportunity.id,
          issuer: fundingOpportunity.issuer,
          meta: fundingOpportunity.meta,
          title: fundingOpportunity.title,
          type: fundingOpportunity.type as FundingResultResponse['match']['type'],
          url: fundingOpportunity.url,
        };
      }
    }
  }

  return {
    props: {
      existingMatch,
      existingSearch,
    },
  };
};

export default Index;
