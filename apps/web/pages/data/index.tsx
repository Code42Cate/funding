import FundingTable from '../../components/admin/FundingTable';
import { GetServerSideProps } from 'next';
import { countFundingOpportunities, getFundingOpportunities } from '../../db/fundingOpportunities';
import { SWRConfig } from 'swr';

export function Data({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <div className="flex flex-col py-6 pl-4 gap-y-6 max-w-full">
        <h1 className="text-3xl font-semibold">Funding Database</h1>
        <FundingTable />
      </div>
    </SWRConfig>
  );
}

const PAGE_SIZE = 10;

// get funding opportunities from the database with pagination
export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1, search = '' } }) => {
  if (typeof page !== 'string' && !Number.isInteger(page)) {
    throw new Error('Invalid page');
  }
  if (typeof search !== 'string') {
    throw new Error('Invalid search');
  }

  const fundingOpportunities = await getFundingOpportunities(Number(page), PAGE_SIZE);

  return {
    props: {
      fallback: {
        [`/api/funding?page=${page}&search=${search}`]: {
          fundingOpportunities: JSON.parse(JSON.stringify(fundingOpportunities)),
          total: await countFundingOpportunities(),
          pageSize: PAGE_SIZE,
        },
      },
    },
  };
};

export default Data;
