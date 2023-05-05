import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { fetcher } from '../../swr';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { preload } from 'swr';

export const Pagination = ({ page, pageSize, total }: { page: number; pageSize: number; total: number }) => {
  const router = useRouter();

  return (
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
            Showing <span className="font-medium">{1 + (page - 1) * pageSize}</span> to{' '}
            <span className="font-medium">{page * pageSize}</span> of <span className="font-medium">{total}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onMouseEnter={() => preload(`/api/funding?page=${page - 1}&search=${router.query.search ?? ''}`, fetcher)}
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
                className={classNames('relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20', {
                  'z-10 bg-purple-100 ring-1 ring-inset ring-purple-300 text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600':
                    page === i + 1,
                  'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0':
                    page !== i + 1,
                })}
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
                    `/api/funding?page=${Math.ceil(total / pageSize - 2 + i)}&search=${router.query.search ?? ''}`,
                    fetcher
                  )
                }
                onClick={() => {
                  const query: Record<string, string | number | string[]> = {
                    page: Math.ceil(total / pageSize - 2 + i),
                  };
                  if (router.query.search) query.search = router.query.search;
                  router.replace({ query });
                }}
                key={`pagination-number${i}`}
                aria-current="page"
                className={classNames('relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20', {
                  'z-10 bg-purple-100 ring-1 ring-inset ring-purple-300 text-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600':
                    page === Math.ceil(total / pageSize - 2 + i),
                  'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0':
                    page !== Math.ceil(total / pageSize - 2 + i),
                })}
              >
                {Math.ceil(total / pageSize - 2 + i)}
              </button>
            ))}

            <button
              onMouseEnter={() => preload(`/api/funding?page=${page + 1}&search=${router.query.search ?? ''}`, fetcher)}
              onClick={() => {
                if (page === Math.ceil(total / pageSize)) return;

                const query: Record<string, string | number | string[]> = {
                  page: page + 1,
                };
                if (router.query.search) query.search = router.query.search;
                router.replace({ query });
              }}
              className={classNames(
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0',
                {
                  'cursor-not-allowed opacity-30': page === Math.ceil(total / pageSize),
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
  );
};
