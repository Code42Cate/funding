import { FundingResultResponse } from '../pages/api/search';
import { StreamingTextURL } from 'nextjs-openai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BookmarkIcon, CheckIcon } from '@heroicons/react/24/outline';

export const ResultCard = ({ match }: { match: FundingResultResponse['match'] | null }) => {
  const router = useRouter();

  const [bookmarkState, setBookmarkState] = useState<'saved' | null>(null);

  if (!match) return null;

  return (
    <div
      className="z-0 h-auto w-full flex-col overflow-y-auto rounded-lg border border-gray-300 bg-white bg-opacity-50 p-4 text-gray-800 shadow-sm"
      data-testid="result-card"
    >
      <>
        <div className="flex flex-row gap-x-2">
          <Image src="/eu.svg" width={100} height={100} alt="eu logo" className="h-16 w-16 rounded-lg object-cover" />

          <div className="flex flex-col justify-center">
            <a
              className="text-lg font-semibold underline-offset-4 hover:underline"
              href={match.url}
              target="_blank"
              rel="noreferrer"
            >
              {match?.title.startsWith(match?.issuer) ? match?.title.replace(`${match?.issuer}:`, '') : match?.title}
            </a>

            <span className="font-medium text-gray-700">{match?.issuer}</span>
          </div>

          <div className="ml-auto flex gap-x-4">
            <button
              data-testid="bookmark-button"
              className="group h-min cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/?id=${router.query.id}`);
                setBookmarkState('saved');
                setTimeout(() => {
                  setBookmarkState(null);
                }, 5000);
              }}
            >
              {bookmarkState === 'saved' ? (
                <CheckIcon className="h-6 w-6 text-green-600" />
              ) : (
                <BookmarkIcon className="h-6 w-6" />
              )}

              <div className="absolute -translate-x-1/2 translate-y-1 rounded-md bg-gray-900 px-2 py-1 text-sm text-gray-50 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-50">
                {bookmarkState === 'saved' ? 'Copied to clipboard!' : 'Bookmark this result'}
              </div>
            </button>

            <a
              className="group h-min cursor-pointer text-gray-500 hover:text-gray-700"
              href={match.url}
              target="_blank"
              rel="noreferrer"
              data-testid="external-link"
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

        {match.type === 'FOERDERDATENBANK' && (
          <div className="flex flex-row gap-1 pt-4">
            {match.meta?.['meta']?.['Förderart'] && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600">
                {match.meta['meta']?.['Förderart']}
              </span>
            )}
            {/* Förderberechtigte */}
            {match.meta?.['meta']?.['Förderberechtigte'] && (
              <span className="truncate rounded-full bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-600">
                {match.meta['meta']?.['Förderberechtigte']}
              </span>
            )}
            {/* Fördergebiet */}
            {match.meta?.['meta']?.['Fördergebiet'] && (
              <span className="truncate rounded-full bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">
                {match.meta['meta']?.['Fördergebiet']}
              </span>
            )}
          </div>
        )}

        {match.type === 'EU' && (
          <div className="flex flex-row gap-1 pt-4">
            {match.meta?.['metadata']?.['deadlineDate'] && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600">
                Deadline: {new Date(match.meta?.['metadata']?.['deadlineDate'][0]).toDateString()}
              </span>
            )}
            {/* Förderberechtigte */}
            {match.meta?.['metadata']?.['startDate'] && !Array.isArray(match.meta?.['metadata']?.['startDate']) && (
              <span className="rounded-full bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-600">
                Startdate: {new Date(match.meta?.['metadata']?.['startDate'][0]).toDateString()}
              </span>
            )}
          </div>
        )}

        <div className="main mt-4 flex flex-col text-sm text-gray-700">
          {match.descriptionSummary ? (
            <div className="overflow text-gray-700">{match.descriptionSummary}</div>
          ) : (
            <StreamingTextURL url={`/api/description/${match.id}`} fade={100} throttle={100} />
          )}
        </div>
      </>
    </div>
  );
};

export default ResultCard;
