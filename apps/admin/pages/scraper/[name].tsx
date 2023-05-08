import TotalIndexedItems from '../../components/admin/TotalIndexedItems';
import ScraperTimer from '../../components/admin/ScraperTimer';
import UptimeCard from '../../components/admin/Uptime';
import { useRouter } from 'next/router';

const titleMap = {
  eu: 'EU Scraper',
};

export function ScraperDetail({ fallback }) {
  const router = useRouter();

  return (
    <div className="flex w-fit flex-col gap-4 px-2 py-4">
      <h1 className="text-2xl font-medium">{titleMap[(router.query.name as string) ?? 'eu']}</h1>

      <UptimeCard />

      <ScraperTimer />

      <TotalIndexedItems />
    </div>
  );
}

export default ScraperDetail;
