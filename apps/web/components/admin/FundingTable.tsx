import useSWR, { preload } from 'swr';
import { useRouter } from 'next/router';
import { GetFundingOpportunitiesResponse } from '../../pages/api/funding/index';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { fetcher } from '../../swr';

export default function FundingTable() {
  const router = useRouter();

  const page = Number(router.query.page ?? 1);

  const { data } = useSWR<GetFundingOpportunitiesResponse>(`/api/funding?page=${page}`, fetcher);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Funding Opportunities List</h1>
          <p className="mt-2 text-sm text-gray-700">A table of all funding opportunities available.</p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Program
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Start Date
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.fundingOpportunities.map((opportunity) => (
                  <tr
                    key={opportunity.url}
                    onMouseEnter={() => {
                      preload('/api/funding/' + opportunity.id, fetcher);
                    }}
                  >
                    <td className="whitespace-pre-wrap py-2 pl-4 pr-3 text-sm text-gray-700 sm:pl-0">
                      {opportunity.title}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                      {opportunity.issuer}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 font-mono">
                      {new Date(opportunity.startAt).toDateString()}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500 font-mono">
                      {new Date(opportunity.deadlineAt).toDateString()}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-center text-white">
                      <span className="px-2 py-1 bg-blue-500 rounded-full">{opportunity.type}</span>
                    </td>
                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href={`/data/${opportunity.id}`} className="text-green-600 hover:text-green-900">
                        Edit<span className="sr-only">, {opportunity.id}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-white py-3 mt-8">
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
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              {Array.from({ length: 7 }).map((_, i) => (
                <button
                  onClick={() => router.replace(`/data?page=${i + 1}`)}
                  key={`pagination-number${i}`}
                  aria-current="page"
                  className={classNames({
                    'relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600':
                      page === i + 1,
                    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                      page !== i + 1,
                  })}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => router.replace(`/data?page=${Number(router.query.page ?? 1) + 1}`)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
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
