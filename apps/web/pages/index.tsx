import DescriptionInput from '../components/DescriptionInput';
import Header from '../components/Header';

export function Index() {
  return (
    <main className="mx-auto mt-10 flex max-w-3xl flex-col gap-y-6">
      <Header />

      <DescriptionInput />

      {/* Filter */}
      <div className="flex flex-row overflow-x-scroll"></div>

      {/* Main Result */}
      <div></div>

      {/* 2 -> k results */}
      <div></div>
    </main>
  );
}

export default Index;
