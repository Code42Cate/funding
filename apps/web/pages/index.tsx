import DescriptionInput from '../components/DescriptionInput';
import Header from '../components/Header';

export function Index() {
  return (
    <main className="mx-auto mt-10 flex max-w-3xl flex-col gap-y-6 py-4">
      <Header />

      <DescriptionInput />

      {/* Filter */}
      <div className="flex flex-row overflow-x-auto"></div>

      {/* Main Result */}
      <div></div>

      {/* 2 -> k results */}
      <div className="relative -mx-4 flex w-full flex-nowrap gap-x-4 overflow-x-auto px-4 py-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="hover:scale-102 flex h-56 w-80 shrink-0 cursor-pointer flex-col rounded-lg border border-gray-300 p-2 text-sm text-gray-800 shadow-sm transition-all duration-200 ease-in-out hover:border-purple-500 hover:shadow-md"
            key={i}
          >
            <h3 className="mt-1 font-semibold">Stipendium für Schlaue Menschen</h3>
            <span className="font-medium">Europäische Kommission</span>
            <div className="my-2 flex flex-row flex-wrap gap-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span className="rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600" key={i}>
                  tag{i}
                </span>
              ))}
            </div>

            <div className="text-gray-700">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s.
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Index;
