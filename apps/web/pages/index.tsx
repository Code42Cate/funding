import Image from 'next/image';
import DescriptionInput from '../components/DescriptionInput';
import Header from '../components/Header';
import { useState } from 'react';
import { GetFundingOpportunitiesResponse } from './api/search';
import { StreamingTextURL } from 'nextjs-openai';
import Filter from '../components/Filter';

export function Index() {
  const [results, setResults] = useState<GetFundingOpportunitiesResponse['hits']>([]);

  const onSearch = (v: string) => {
    fetch(`/api/search?search=${encodeURIComponent(v)}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResults(res.hits);
      });
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-y-6 px-2 py-4 sm:mt-10">
      <Header />

      <DescriptionInput onSearch={onSearch} />

      <Filter />

      {/* Filter */}
      <div className="flex flex-row overflow-x-auto"></div>

      {/* Main Result */}
      {results.length > 0 && (
        <div className="h-auto w-full flex-col overflow-y-auto rounded-lg border border-gray-300 p-4 text-gray-800 shadow-sm">
          <>
            <div className="flex flex-row gap-x-2">
              <Image
                src="/eu.svg"
                width={100}
                height={100}
                alt="eu logo"
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div className="flex flex-col justify-center">
                <h2 className="text-lg font-semibold">
                  {results[0]?.title.startsWith(results[0]?.issuer)
                    ? results[0]?.title.replace(`${results[0]?.issuer}:`, '')
                    : results[0]?.title}
                </h2>
                <span className="font-medium text-gray-700">{results[0]?.issuer}</span>
              </div>

              <div className="ml-auto flex gap-x-4">
                <a className="group h-min cursor-pointer text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>

                  <div className="absolute -translate-x-1/2 translate-y-1 rounded-md bg-gray-900 px-2 py-1 text-sm text-gray-50 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-50">
                    Bookmark this result
                  </div>
                </a>

                <a
                  className="group h-min cursor-pointer text-gray-500 hover:text-gray-700"
                  href={results[0].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                  <div className="absolute -translate-x-1/2 translate-y-1 rounded-md bg-gray-900 px-2 py-1 text-sm text-gray-50 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-50">
                    Open external funding page
                  </div>
                </a>
              </div>
            </div>

            {results[0].type === 'FOERDERDATENBANK' && (
              <div className="flex flex-row gap-1 pt-4">
                {results[0].meta?.['meta']?.['Förderart'] && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600">
                    {results[0].meta['meta']?.['Förderart']}
                  </span>
                )}
                {/* Förderberechtigte */}
                {results[0].meta?.['meta']?.['Förderberechtigte'] && (
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-600">
                    {results[0].meta['meta']?.['Förderberechtigte']}
                  </span>
                )}
                {/* Fördergebiet */}
                {results[0].meta?.['meta']?.['Fördergebiet'] && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
                    {results[0].meta['meta']?.['Fördergebiet']}
                  </span>
                )}
              </div>
            )}

            {results[0].type === 'EU' && (
              <div className="flex flex-row gap-1 pt-4">
                {results[0].meta?.['metadata']?.['deadlineDate'] && (
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600">
                    Deadline: {new Date(results[0].meta?.['metadata']?.['deadlineDate']).toLocaleDateString()}
                  </span>
                )}
                {/* Förderberechtigte */}
                {results[0].meta?.['metadata']?.['startDate'] && (
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-600">
                    Startdate: {new Date(results[0].meta?.['metadata']?.['startDate']).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}

            <div className="main mt-4 flex flex-col text-sm text-gray-700">
              {results[0].descriptionSummary ? (
                <div className="overflow text-gray-700">{results[0].descriptionSummary}</div>
              ) : (
                <StreamingTextURL url={`/api/description/${results[0].id}`} fade={100} throttle={100} />
              )}
            </div>
          </>
        </div>
      )}
    </main>
  );
}

export default Index;
