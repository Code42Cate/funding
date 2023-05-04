import { useRouter } from 'next/router';
import { GetFundingOpportunityResponse } from '../admin/../../pages/api/funding/[id]';
import { fetcher } from '../../swr';
import useSWR from 'swr';

export const FundingDetail = () => {
  const router = useRouter();

  const { data } = useSWR<GetFundingOpportunityResponse>(`/api/funding/${router.query.id}`, fetcher);

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{new Date(data.createdAt).toDateString()}</p>
      <p>{new Date(data.deadlineAt).toDateString()}</p>
      <p>{new Date(data.startAt).toDateString()}</p>
      <p>{new Date(data.deletedAt).toDateString()}</p>

      {/* <div dangerouslySetInnerHTML={{ __html: data.description }}></div> */}
    </div>
  );
};
