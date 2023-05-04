import db from '@funding-database/db';
import { FundingOpportunity } from '@prisma/client';

const DEFAULT_PAGE_SIZE = 10;

export const getFundingOpportunities = async (
  page: number,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<Omit<FundingOpportunity, 'meta' | 'description'>[]> => {
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
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return fundingOpportunities;
};

export const countFundingOpportunities = async (): Promise<number> => {
  const count = await db.fundingOpportunity.count();

  return count;
};
