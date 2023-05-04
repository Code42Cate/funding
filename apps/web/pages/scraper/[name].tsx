import ScraperTimer from '../../components/admin/ScraperTimer';
import UptimeCard from '../../components/admin/Uptime';
import { useRouter } from 'next/router';

const titleMap = {
  eu: 'EU Scraper',
};

export function ScraperDetail({ fallback }) {
  const router = useRouter();

  return (
    <div className="py-4 px-2 flex flex-col gap-4 w-fit">
      <h1 className="text-2xl font-medium">{titleMap[(router.query.name as string) ?? 'eu']}</h1>

      <UptimeCard />

      <ScraperTimer />
    </div>
  );
}

export default ScraperDetail;
