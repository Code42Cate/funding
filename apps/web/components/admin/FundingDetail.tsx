import { useRouter } from 'next/router';
import { GetFundingOpportunityResponse } from '../../pages/api/funding/[id]/index';
import { fetcher } from '../../swr';
import useSWR from 'swr';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { StreamingTextURL } from 'nextjs-openai';

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

  return (
    <div className="overflow-hidden bg-white shadow-sm rounded-md border max-w-5xl border-gray-300">
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
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 truncate">
              <a className="text-blue-500 hover:underline underline-offset-2" href={data.url}>
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
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Start At</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {prettyPrintDate(data.startAt)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Deadline At</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {prettyPrintDate(data.deadlineAt)}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.descriptionSummary ? (
                data.descriptionSummary
              ) : (
                <StreamingTextURL url={`/api/funding/${data.id}/description`} fade={100} throttle={100} />
              )}
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
