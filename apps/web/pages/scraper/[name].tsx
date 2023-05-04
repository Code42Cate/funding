import UptimeCard from '../../components/admin/Uptime';
import { useRouter } from 'next/router';

export function ScraperDetail({ fallback }) {
  const router = useRouter();

  return (
    <div>
      <h1>Scraper Detail: {router.query.name} </h1>

      <UptimeCard />
    </div>
  );
}

export default ScraperDetail;
