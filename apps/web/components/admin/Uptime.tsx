const Bar = ({ state }: { state: 'warning' | 'error' | 'success' }) => {
  return <div className="h-7 w-[6px] bg-green-400" />;
};

export const UptimeCard = () => {
  return (
    <div className="flex flex-col border border-gray-300 shadow-md p-6 gap-y-3 w-fit rounded-lg">
      <div className="flex flex-row gap-x-1">
        {Array(45)
          .fill(0)
          .map((_, i) => (
            <Bar key={i} state="success" />
          ))}
      </div>
      <div className="grid grid-cols-5 text-gray-700 text-sm font-medium">
        <div>
          <span>45 days ago</span>
        </div>
        <div className="grow h-full" />
        <div className="text-center">
          <span>100% Uptime</span>
        </div>
        <div className="grow h-full" />
        <div className="text-right">
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default UptimeCard;
