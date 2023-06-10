import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeaderLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <a
      className="flex h-16 flex-col justify-center bg-white bg-opacity-0 px-4 py-2 text-center font-semibold text-white transition-all hover:bg-opacity-5"
      href={link}
    >
      {text}
    </a>
  );
};

export default function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased">
      <header className="fixed z-40 m-3 flex h-16 w-[calc(100vw-25px)] justify-between gap-x-4 rounded-2xl border border-gray-200 border-opacity-25 bg-black bg-opacity-25 px-4 text-white shadow-md backdrop-blur-md backdrop-filter">
        <span className="flex h-16 flex-col justify-center gap-y-10 font-mono text-xl font-semibold text-orange-400">
          LOGO
        </span>
        <div className="flex">
          <HeaderLink text="Documentation" link="/docs" />
          <HeaderLink text="Github" link="https://github.com" />
          <HeaderLink text="Slack" link="https://slack.com" />
          <HeaderLink text="Blog" link="https://blog.com" />
        </div>
      </header>
      <div className="backdrop" />
      <div className="z-20 mx-auto flex max-w-4xl flex-col items-center justify-center px-4 pb-20 pt-56 text-center">
        <h1 className="text-6xl font-semibold text-white">funding ding</h1>
        <h2 className="mt-6 text-2xl text-white">get funding for your useless projects from poor tax payers</h2>

        <div className="mt-10 flex gap-x-2">
          <button className="rounded-md bg-orange-600 px-4 py-2 font-mono text-white transition-all hover:bg-orange-700">
            Find Funding
          </button>
          <button className="rounded-md bg-black px-4 py-2 font-mono text-white">Schedule Demo</button>
        </div>
        <div className="relative mt-20 h-auto w-full rounded-[20px]">
          <div
            className="z-10 h-[200px] w-full rounded-[20px] border-[3px] border-white border-opacity-30 bg-orange-500 sm:h-[500px]"
            style={{
              transform: `perspective(${Math.max(75, 75 + scrollPosition)}em) rotateX(18deg)`,
            }}
          >
            <Image src="/hrm4.svg" className="z-10 block w-full  text-gray-700" alt="layers" fill priority />
          </div>
        </div>

        <div className="mt-40 flex max-h-[600px] w-full max-w-4xl flex-col justify-center gap-4 sm:flex-row">
          <div className="flex h-[400px] cursor-pointer flex-col rounded-md border border-gray-200 bg-white transition-all duration-500 hover:border-gray-300 hover:shadow-2xl sm:w-1/3">
            <span className="px-4 pt-14 text-xl font-semibold">Simple</span>
            <p className="mt-4">Even Nicklers can use it!</p>
            <div className="relative mx-auto h-2/3 w-4/5">
              <Image src="/integrations.svg" fill alt="layers" priority />
            </div>
          </div>
          <div className="flex h-[400px] flex-col gap-y-4 sm:w-1/3">
            <div className="flex h-[200px] cursor-pointer  flex-col rounded-md border border-gray-200 bg-white transition-all duration-500 hover:border-gray-300 hover:shadow-2xl">
              <div className="relative m-auto h-2/3 w-4/5">
                <Image src="/feature.svg" fill alt="layers" priority />
              </div>
            </div>

            <div className="flex h-[200px] cursor-pointer flex-col rounded-md border border-gray-200 bg-white transition-all duration-500 hover:border-gray-300 hover:shadow-2xl">
              <span className="px-4 pt-14 text-xl font-semibold">Idk anymore</span>
              <p className="mt-4 font-mono font-medium text-orange-500">what do you want huh</p>
            </div>
          </div>

          <div className="flex min-h-[400px] flex-col gap-y-4 sm:w-1/3">
            <div className="w-full cursor-pointer rounded-md  border border-gray-200 bg-white px-4 pb-4 pt-6 transition-all duration-500 hover:border-gray-300 hover:shadow-2xl">
              <span className="px-4 pt-14 text-xl font-semibold">SAP-based</span>
              <p className="mt-4">Everyone loves SAP software</p>
            </div>
            <div className="h-full w-full cursor-pointer rounded-md border  border-gray-200 bg-white px-4 pb-4 pt-6 transition-all duration-500 hover:border-gray-300 hover:shadow-2xl">
              <span className="px-4 pt-14 text-xl font-semibold">Free</span>
              <p className="mt-4">Apache 2.0 and Open Source</p>
              <div className="relative mx-auto h-2/3 w-4/5">
                <Image src="/free.svg" fill alt="layers" priority />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex gap-x-2">
          <button className="rounded-md bg-orange-600 px-4 py-2 font-mono text-white transition-all hover:bg-orange-700">
            Find Funding
          </button>
          <button className="rounded-md bg-black px-4 py-2 font-mono text-white">Schedule Demo</button>
        </div>
      </div>

      <footer className="flex w-full flex-col items-center bg-gray-50 px-4 pb-20 pt-10 text-gray-900">
        <div className="flex w-full max-w-4xl flex-row items-start gap-x-40 pb-8">
          <ul className="flex flex-col">
            <li className="mt-2">
              <a className="cursor-pointer underline-offset-2 hover:underline">About</a>
            </li>
            <li className="mt-2">
              <a className="cursor-pointer underline-offset-2 hover:underline">Careers</a>
            </li>
            <li className="mt-2">
              <a className="cursor-pointer underline-offset-2 hover:underline">Contact</a>
            </li>
          </ul>

          <ul className="flex flex-col">
            <li className="mt-2">
              <a className="cursor-pointer underline-offset-2 hover:underline">Blog</a>
            </li>
            <li className="mt-2">
              <a className="cursor-pointer underline-offset-2 hover:underline">Privacy & Data Security</a>
            </li>
            <li className="mt-2">
              <a className="cursor-pointer underline-offset-2 hover:underline">Imprint</a>
            </li>
          </ul>
        </div>

        <div className="flex w-full border-t border-gray-200" />
        <div className="w-full max-w-4xl pt-8">
          <span>© 2023 Funding Ding. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
