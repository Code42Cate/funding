import { useRouter } from 'next/router';
import { GetFundingOpportunityResponse } from '../../pages/api/funding/[id]/index';
import { fetcher } from '../../swr';
import useSWR from 'swr';
import { ChevronDownIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { StreamingTextURL } from 'nextjs-openai';
import { useState } from 'react';
import classNames from 'classnames';

const prettyPrintDate = (date: string | Date) =>
  new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const prettyPrintTitle = (text: string) => text.toLowerCase().replace(/(?<!\S)\S/g, (initial) => initial.toUpperCase());

export const FundingDetail = () => {
  const router = useRouter();

  const { data } = useSWR<GetFundingOpportunityResponse>(`/api/funding/${router.query.id}`, fetcher);

  const [showOriginalDescription, setShowOriginalDescription] = useState(false);

  return (
    <div className="max-w-5xl overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Title</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {prettyPrintTitle(data.title)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Programme</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{data.issuer}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">URL</dt>
            <dd className="mt-1 truncate text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a className="text-blue-500 underline-offset-2 hover:underline" href={data.url}>
                {data.url}
              </a>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">First Indexed At</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {prettyPrintDate(data.createdAt)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Last Updated At</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {prettyPrintDate(data.updatedAt)}
            </dd>
          </div>
          {data.startAt && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Start At</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {prettyPrintDate(data.startAt)}
              </dd>
            </div>
          )}
          {data.deadlineAt && (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">Deadline At</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {prettyPrintDate(data.deadlineAt)}
              </dd>
            </div>
          )}

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.descriptionSummary ? (
                data.descriptionSummary
              ) : (
                <StreamingTextURL url={`/api/funding/${data.id}/description`} fade={100} throttle={100} />
              )}

              <div className="mt-4">
                <button
                  className="flex items-center underline underline-offset-4"
                  onClick={() => setShowOriginalDescription(!showOriginalDescription)}
                >
                  {showOriginalDescription ? 'Hide' : 'Show'} Original Description{' '}
                  <ChevronDownIcon
                    className={classNames('ml-1 h-4 w-4 text-gray-500 transition-all duration-500', {
                      '-rotate-180': showOriginalDescription,
                    })}
                  />
                </button>
                {showOriginalDescription && (
                  <div className="description mt-4" dangerouslySetInnerHTML={{ __html: data.description }} />
                )}
              </div>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">metadata.json</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `data:text/json;charset=utf8,${encodeURIComponent(
                          JSON.stringify(data.meta ?? {})
                        )}`;
                        link.download = 'metadata.json';
                        link.click();
                      }}
                      className="font-medium text-purple-600 hover:text-purple-500"
                    >
                      Download
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
