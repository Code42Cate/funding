import DescriptionInput from '../components/DescriptionInput';
import Header from '../components/Header';
import { useState } from 'react';
import { FundingResultResponse } from './api/search';
import Filter from '../components/Filter';
import { SelectedFilters } from '../filters';
import { useRouter } from 'next/router';
import ResultCard from '../components/ResultCard';
import { GetServerSideProps } from 'next';
import db from '@funding-database/db';

type Props = {
  existingMatch: FundingResultResponse['match'] | null;
  existingSearch: string | null;
};

export function Index({ existingMatch, existingSearch }: Props) {
  const [match, setMatch] = useState<FundingResultResponse['match'] | null>(existingMatch);
  const router = useRouter();

  const onSearch = (v: string) => {
    fetch(`/api/search?search=${encodeURIComponent(v)}&filters=${encodeURIComponent(JSON.stringify(selectedFilters))}`)
      .then((res) => res.json())
      .then((res: FundingResultResponse) => {
        setMatch(res.match);
        router.push(`/?id=${res.id}`, undefined, { shallow: true });
      });
  };

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-y-6 px-2 py-4 sm:mt-10">
      <Header />

      <DescriptionInput onSearch={onSearch} defaultValue={existingSearch} />

      <Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />

      {match && <ResultCard match={match} />}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let existingMatch: FundingResultResponse['match'] | null = null;
  let existingSearch: string | null = null;

  if (context.query.id) {
    const result = await db.result.findUnique({
      where: {
        id: context.query.id as string,
      },
    });
    if (result) {
      const opId = result.fundingOpportunityId;
      const fundingOpportunity = await db.fundingOpportunity.findUnique({
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
