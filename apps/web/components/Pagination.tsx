import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

export const Pagination = ({ page, pageSize, total }: { page: number; pageSize: number; total: number }) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex flex-1 justify-between">
        <button
          className="relative inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => {
            let page = Number(router.query.page) || 1;
            if (page !== 1) page -= 1;

            router.push({ query: { ...router.query, page } });
          }}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous Result
        </button>
        <button
          onClick={() => {
            router.push({ query: { ...router.query, page: router.query.page ? Number(router.query.page) + 1 : 2 } });
          }}
          className="relative ml-3 inline-flex items-center rounded-md  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next Result
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
