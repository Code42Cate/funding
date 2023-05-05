import { EnvelopeIcon, ArrowPathIcon, HomeIcon, CircleStackIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const Layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, shortcut: 'ctrl+d' },
    { name: 'Database', href: '/data', icon: CircleStackIcon },
    {
      name: 'Scraper',
      href: '/scraper',
      icon: ArrowPathIcon,
      shortcut: 'ctrl+s',
    },
    {
      name: 'Notifications',
      href: '/notifications',
      icon: EnvelopeIcon,
    },
  ];

  // Dynamically listen to all shortcuts, then check what shortcut got triggered and navigate to the page
  useHotkeys(
    navigation.reduce((acc, { shortcut }) => `${acc}, ${shortcut}`, ''),
    (event, handler) => {
      event.preventDefault();

      const item = navigation.find((item) => item.shortcut === handler.keys.join('+'));
      if (item) {
        router.push(item.href);
      }
    },
    {
      enableOnFormTags: true,
    }
  );

  return (
    <>
      <div>
        <div
          aria-live="assertive"
          className="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
          <div className="flex w-full flex-col items-center space-y-4 sm:items-end">{/*TODO: Notifications */}</div>
        </div>
        <div className="absolute inset-y-0 flex flex-col">
          <div className="flex flex-grow flex-col border-r border-gray-200 p-3">
            <div className="mt-1 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-1">
                <Link
                  href={'/'}
                  className={classNames(
                    'flex items-center rounded-md p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6'
                  )}
                >
                  <Image
                    priority
                    src="/logo.svg"
                    alt="Funding Database Logo"
                    width={150}
                    height={50}
                    className="flex-shrink-0 h-8 w-auto mx-auto"
                  />
                </Link>

                {navigation.map((item) => (
                  <div key={item.name} className="group relative" data-cy="nav-item">
                    <Link
                      href={item.href}
                      className={classNames(
                        'flex items-center rounded-md p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500',
                        {
                          'bg-gray-100': router.pathname === item.href,
                          'text-gray-600 hover:bg-gray-100 hover:text-gray-900': router.pathname !== item.href,
                        }
                      )}
                    >
                      <item.icon
                        className={classNames('m-1 h-6 w-6 flex-shrink-0', {
                          'text-gray-600': router.pathname === item.href,
                          'text-gray-500 group-hover:text-gray-600': router.pathname !== item.href,
                        })}
                        aria-hidden="true"
                      />
                    </Link>
                    {/* Help thingy */}
                    <div className="invisible absolute top-3 left-16 z-20 w-max rounded border bg-gray-50 px-2 group-hover:visible">
                      <span className="w-full text-xs text-gray-600">
                        {item.name} {item.shortcut && `(${item.shortcut.toUpperCase()})`}
                      </span>
                      <div className="absolute -left-[6px] top-[6px] border-y-[6px] border-r-[6px] border-l-0 border-solid border-y-transparent border-r-gray-200"></div>
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex h-screen flex-1 flex-col overflow-x-auto pl-24">
          <main className="h-full flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
