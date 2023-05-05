import { BellAlertIcon } from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, CartesianGrid, ReferenceDot, Tooltip } from 'recharts';

const data = [
  {
    date: '2021-01-01',
    ns: 2400,
  },
  {
    date: '2021-01-02',
    ns: 1398,
  },
  {
    date: '2021-01-03',
    ns: 9800,
  },
  {
    date: '2021-01-04',
    ns: 3908,
  },
  {
    date: '2021-01-05',
    ns: 4800,
  },
  {
    date: '2021-01-06',
    ns: 3800,
  },
  {
    date: '2021-01-07',
    ns: 4300,
  },
];

const WIDTH = 500;
const HEIGHT = 250;

export const NotificationsChart = () => {
  return (
    <div className="rounded-md border border-gray-100 shadow-md p-4 w-fit flex flex-col">
      <div className="flex flex-row items-center align-middle mb-4 gap-x-2">
        <div className="rounded-md bg-green-100 p-1 h-fit">
          <BellAlertIcon className="h-4 w-4 text-green-700" strokeWidth={2} />
        </div>
        <div className="font-semibold">Daily Notifications</div>
      </div>
      <AreaChart width={WIDTH} height={HEIGHT} data={data} margin={{ top: 10 }}>
        <defs>
          <linearGradient id="colorNs" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="#ccc"
          strokeDasharray="1 10"
          horizontalPoints={[-10]}
          verticalCoordinatesGenerator={() => Array.from({ length: WIDTH / 10 }).map((_, i) => (i + 1) * 10)}
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          fontSize={12}
          tickFormatter={(v: string) =>
            new Date(v).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
            })
          }
          interval={Math.floor(data.length / 3)}
          tickLine={false}
          padding={{ left: 20, right: 20 }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '8px',
          }}
        />
        <Area type="monotone" dataKey="ns" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorNs)" />
      </AreaChart>
    </div>
  );
};

export default NotificationsChart;
