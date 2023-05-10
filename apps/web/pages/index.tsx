import Image from 'next/image';
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
      <div className="h-96 w-full flex-col rounded-lg border border-gray-300 p-4 text-gray-800 shadow-sm">
        <div className="flex flex-row gap-x-2">
          <Image src="/eu.svg" width={100} height={100} alt="eu logo" className="h-16 w-16 rounded-lg object-cover" />

          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-semibold">Erasmus für Jungunternehmer</h2>
            <span className="font-medium text-gray-700">Europäische Kommission</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col text-sm text-gray-700">
          <ul>
            <li>
              <span className="font-semibold">Förderung:</span> 5000€
            </li>
            <li>
              <span className="font-semibold">Bewerbungsfrist:</span> 31.12.2021
            </li>
            <li>
              <span className="font-semibold">Cool?</span> <a href="#">Ja</a>
            </li>
          </ul>
        </div>
      </div>

      {/* 2 -> k results */}
      <div className="relative -mx-4 flex w-full flex-nowrap gap-x-4 overflow-x-auto px-4 py-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="hover:scale-102 flex h-56 w-80 shrink-0 cursor-pointer flex-col rounded-lg border border-gray-300 p-3 text-sm text-gray-800 shadow-sm transition-all duration-200 ease-in-out hover:border-purple-500 hover:shadow-md"
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
