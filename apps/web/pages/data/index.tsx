import FundingTable from '../../components/admin/FundingTable';
import { GetServerSideProps } from 'next';
import { countFundingOpportunities, getFundingOpportunities } from '../../db/fundingOpportunities';
import { SWRConfig } from 'swr';

export function Data({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <div className="text-blue-400 flex flex-col justify-center max-w-7xl mx-auto p-10">
        <FundingTable />
      </div>
    </SWRConfig>
  );
}

const PAGE_SIZE = 10;

// get funding opportunities from the database with pagination
export const getServerSideProps: GetServerSideProps = async ({ query: { page = 1 } }) => {
  if (typeof page !== 'string' && !Number.isInteger(page)) {
    throw new Error('Invalid page');
  }

  const fundingOpportunities = await getFundingOpportunities(Number(page), PAGE_SIZE);

  return {
    props: {
      fallback: {
        [`/api/funding?page=${page}`]: {
          fundingOpportunities: JSON.parse(JSON.stringify(fundingOpportunities)),
          total: await countFundingOpportunities(),
          pageSize: PAGE_SIZE,
        },
      },
    },
  };
};

export default Data;
