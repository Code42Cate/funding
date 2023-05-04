import { FundingOpportunity } from '@prisma/client';
import FundingTable from '../components/admin/FundingTable';
import db from '@funding-database/db';

export function Index({ fundingOpportunities }: { fundingOpportunities: FundingOpportunity[] }) {
  return (
    <div className="text-blue-400 flex flex-col justify-center max-w-7xl mx-auto p-10">
      <FundingTable fundingOpportunities={fundingOpportunities} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const fundingOpportunities = await db.fundingOpportunity.findMany({
    select: {
      createdAt: true,
      updatedAt: true,
      deadlineAt: true,
      deletedAt: true,
      issuer: true,
      startAt: true,
      targetGroup: true,
      title: true,
      type: true,
      url: true,
      meta: false,
    },
  });

  return {
    props: {
      fundingOpportunities: JSON.parse(JSON.stringify(fundingOpportunities)),
    },
  };
};

export default Index;
