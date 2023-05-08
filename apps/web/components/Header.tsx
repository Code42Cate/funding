import Image from 'next/image';

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-800">Project Funding 💰</h1>

      <button className="text-gray-600 hover:text-gray-800">
        <Image src="/bell-plus.svg" width={24} height={24} priority alt="Get notified" />
      </button>
    </header>
  );
}
