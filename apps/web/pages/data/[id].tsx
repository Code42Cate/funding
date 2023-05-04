import { FundingDetail } from '../../components/admin/FundingDetail';
import { getFundingOpportunity } from '../../db/fundingOpportunities';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';

export function FundingDetailPage({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <FundingDetail />
    </SWRConfig>
  );
}

// get funding opportunities from the database with pagination
export const getServerSideProps: GetServerSideProps = async ({ query: { id = 1 } }) => {
  if (typeof id !== 'string' && !Number.isInteger(id)) {
    throw new Error('Invalid id');
  }

  const fundingOpportunity = await getFundingOpportunity(Number(id));

  return {
    props: {
      fallback: {
        [`/api/funding/${id}`]: JSON.parse(JSON.stringify(fundingOpportunity)),
      },
    },
  };
};

export default FundingDetailPage;
