import { ArrowUpIcon } from '@heroicons/react/24/outline';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const TotalIndexedItems = () => {
  return (
    <div className="flex w-full flex-row justify-between rounded-lg border border-gray-300 p-6 shadow-md">
      <div className="flex flex-col">
        <div>Total Indexed Items</div>
        <div className="mt-6 flex flex-col">
          <span className="text-xl font-medium">20.8k</span>
          <div className="flex items-center text-sm">
            <ArrowUpIcon className="h-3 w-3 text-green-500" strokeWidth={3} />
            <span className="text-green-500">12%</span>
            <span className="ml-1">vs last month</span>
          </div>
        </div>
      </div>

      <div>
        <AreaChart width={230} height={150} data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="pv" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </div>
    </div>
  );
};

export default TotalIndexedItems;
