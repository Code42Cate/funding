import useSWR, { preload } from 'swr';
import { useRouter } from 'next/router';
import { GetFundingOpportunitiesResponse } from '../../pages/api/funding/index';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { fetcher } from '../../swr';
import { useRef, useState, useLayoutEffect } from 'react';

const prettyPrintDate = (date: string | Date) =>
  new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const prettyPrintTitle = (text: string) => text.toLowerCase().replace(/(?<!\S)\S/g, (initial) => initial.toUpperCase());

const isEntryActive = (entry: GetFundingOpportunitiesResponse['fundingOpportunities'][0]) =>
  entry.deletedAt === null && new Date(entry.deadlineAt) > new Date();

const StatusBadge = ({ status }: { status: 'active' | 'inactive' }) => (
  <div
    className={classNames('px-2 py-1 text-sm text-center w-min flex gap-2 items-center rounded-full', {
      'bg-green-100 text-green-800': status === 'active',
      'bg-yellow-100 text-yellow-800': status === 'inactive',
    })}
  >
    <div
      className={classNames('w-2 h-2 rounded-full', {
        'bg-green-500': status === 'active',
        'bg-yellow-500': status === 'inactive',
      })}
    />
    {status === 'active' ? 'Active' : 'Inactive'}
  </div>
);

const TypeBadge = ({ type }: { type: string }) => (
  <div
    className={classNames('px-2 py-1 text-sm text-center w-min rounded-full', {
      'bg-blue-100 text-blue-800': type === 'EU',
    })}
  >
    {type}
  </div>
);

export default function FundingTable() {
  const router = useRouter();

  const page = Number(router.query.page ?? 1);

  const { data } = useSWR<GetFundingOpportunitiesResponse>(
    `/api/funding?page=${page}&search=${router.query.search ?? ''}`,
    fetcher
  );

  const checkbox = useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate = selectedEntries.length > 0 && selectedEntries.length < data.fundingOpportunities.length;
    setChecked(selectedEntries.length === data.fundingOpportunities.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedEntries, data.fundingOpportunities.length]);

  const toggleAll = () => {
    setSelectedEntries(checked || indeterminate ? [] : data.fundingOpportunities);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  return (
    <div className="border border-gray-300 shadow-md rounded-lg max-w-7xl">
      <div className="p-4 border-b border-gray-200 flex justify-between">
        {/* Filter */}
        <div className="flex gap-x-2 items-center align-middle">
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-100 px-3 py-2 h-fit text-sm font-semibold text-purple-600 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            All Time
            <XMarkIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-purple-100 px-3 py-2 h-fit text-sm font-semibold text-purple-600 shadow-sm hover:bg-purple-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            Active
            <XMarkIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 h-fit text-sm font-semibold text-gray-800 shadow-sm border-gray-300 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 hover:bg-gray-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 12H18M3 6H21M9 18H15"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            More Filters
          </button>
        </div>

        {/* Search */}
        <div>
          <div>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                value={router.query.search ? decodeURIComponent(router.query.search as string) : ''}
                onChange={(e) => {
                  if (e.target.value === '') {
                    router.replace(`/data`);
                  } else {
                    router.replace(`/data?search=${encodeURIComponent(e.target.value)}`);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedEntries.length > 0 && (
                <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                  <button
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Bulk edit
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Delete all
                  </button>
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope="col" className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 w-96">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 w-36">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      First Indexed
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Source
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.fundingOpportunities.map((entry) => (
                    <tr key={entry.id} className={selectedEntries.includes(entry) ? 'bg-gray-50' : undefined}>
                      <td className="relative px-7 sm:w-12 sm:px-6">
                        {selectedEntries.includes(entry) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-purple-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                          value={entry.id}
                          checked={selectedEntries.includes(entry)}
                          onChange={(e) =>
                            setSelectedEntries(
                              e.target.checked
                                ? [...selectedEntries, entry]
                                : selectedEntries.filter((p) => p !== entry)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-pre-line py-4 pr-3 text-sm',
                          selectedEntries.includes(entry) ? 'text-purple-600' : 'text-gray-900'
                        )}
                      >
                        <div className="w-96 truncate font-medium">{prettyPrintTitle(entry.title)}</div>
                        <div className="text-gray-700">{entry.issuer}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="justify-center align-middle h-full flex">
                          <StatusBadge status={isEntryActive(entry) ? 'active' : 'inactive'} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {prettyPrintDate(entry.createdAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {prettyPrintDate(entry.updatedAt)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-left">
                        <TypeBadge type={entry.type} />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <a href="#" className="text-purple-600 hover:text-purple-900">
                          Edit<span className="sr-only">, {entry.id}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-5 mt-8">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{1 + (page - 1) * data.pageSize}</span> to{' '}
              <span className="font-medium">{page * data.pageSize}</span> of{' '}
              <span className="font-medium">{data.total}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onMouseEnter={() =>
                  preload(`/api/funding?page=${page - 1}&search=${router.query.search ?? ''}`, fetcher)
                }
                className={classNames(
                  'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                  {
                    'cursor-not-allowed opacity-30': page === 1,
                  }
                )}
                onClick={() => {
                  if (page === 1) return;

                  const query: Record<string, string | number | string[]> = {
                    page: page - 1,
                  };
                  if (router.query.search) query.search = router.query.search;
                  router.replace({ query });
                }}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {Array.from({ length: 3 }).map((_, i) => (
                <button
                  onMouseEnter={() => {
                    preload(`/api/funding?page=${i + 1}&search=${router.query.search ?? ''}`, fetcher);
                  }}
                  onClick={() => {
                    const query: Record<string, string | number | string[]> = {
                      page: i + 1,
                    };
                    if (router.query.search) query.search = router.query.search;
                    router.replace({ query });
                  }}
                  key={`pagination-number${i}`}
                  aria-current="page"
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20',
                    {
                      'z-10 bg-purple-100 ring-1 ring-inset ring-purple-300 text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600':
                        page === i + 1,
                      'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0':
                        page !== i + 1,
                    }
                  )}
                >
                  {i + 1}
                </button>
              ))}

              <button
                aria-current="page"
                className={classNames(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 text-gray-900 ring-1 ring-inset ring-gray-300 cursor-default'
                )}
              >
                ...
              </button>

              {Array.from({ length: 3 }).map((_, i) => (
                <button
                  onMouseEnter={() =>
                    preload(
                      `/api/funding?page=${Math.ceil(data.total / data.pageSize - 2 + i)}&search=${
                        router.query.search ?? ''
                      }`,
                      fetcher
                    )
                  }
                  onClick={() => {
                    const query: Record<string, string | number | string[]> = {
                      page: Math.ceil(data.total / data.pageSize - 2 + i),
                    };
                    if (router.query.search) query.search = router.query.search;
                    router.replace({ query });
                  }}
                  key={`pagination-number${i}`}
                  aria-current="page"
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20',
                    {
                      'z-10 bg-purple-100 ring-1 ring-inset ring-purple-300 text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600':
                        page === Math.ceil(data.total / data.pageSize - 2 + i),
                      'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0':
                        page !== Math.ceil(data.total / data.pageSize - 2 + i),
                    }
                  )}
                >
                  {Math.ceil(data.total / data.pageSize - 2 + i)}
                </button>
              ))}

              <button
                onMouseEnter={() =>
                  preload(`/api/funding?page=${page + 1}&search=${router.query.search ?? ''}`, fetcher)
                }
                onClick={() => {
                  if (page === Math.ceil(data.total / data.pageSize)) return;

                  const query: Record<string, string | number | string[]> = {
                    page: page + 1,
                  };
                  if (router.query.search) query.search = router.query.search;
                  router.replace({ query });
                }}
                className={classNames(
                  'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                  {
                    'cursor-not-allowed opacity-30': page === Math.ceil(data.total / data.pageSize),
                  }
                )}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
