import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { SelectedFilters } from '../pages/api/search';

const filters = [
  {
    id: 'source',
    name: 'Data Source',
    options: [
      { value: 'EU', label: 'EU Funding' },
      { value: 'DAAD', label: 'DAAD' },
      { value: 'FOERDERDATENBANK', label: 'Förderdatenbank' },
    ],
  },
  {
    id: 'location',
    name: 'Location',
    options: [
      { value: 'eu', label: 'European Union' },
      { value: 'germany', label: 'Germany' },
      { value: 'baden-wuerttemberg', label: 'Baden-Wuerttemberg' },
    ],
  },
  {
    id: 'funding-type',
    name: 'Funding Type',
    options: [
      { value: 'training', label: 'Training' },
      { value: 'grant', label: 'Grant' },
      { value: 'support', label: 'Support' },
    ],
  },
  {
    id: 'target-group',
    name: 'Target Group',
    options: [
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
    ],
  },
];

const sectionHasFilter = (section: (typeof filters)[0], selectedFilters: SelectedFilters) => {
  return section.options.some((option) => selectedFilters[section.id]?.includes(option.value));
};

export const Filter = ({
  selectedFilters,
  setSelectedFilters,
}: {
  selectedFilters: SelectedFilters;
  setSelectedFilters: Dispatch<SetStateAction<SelectedFilters>>;
}) => {
  const onSelect = (section: (typeof filters)[0], option: (typeof filters)[0]['options'][0]) => {
    setSelectedFilters((prev) => {
      if (prev[section.id] && prev[section.id].some((v) => v === option.value)) {
        return {
          ...prev,
          [section.id]: prev[section.id].filter((v) => v !== option.value),
        };
      } else {
        return {
          ...prev,
          [section.id]: [...(prev[section.id] || []), option.value],
        };
      }
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 sm:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.name} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    onClick={() => onSelect(section, option)}
                                    checked={selectedFilters[section.id]?.includes(option.value)}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="mx-auto max-w-3xl px-2 text-center lg:max-w-7xl">
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className="flex items-center justify-end">
            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <Popover.Group className="hidden sm:flex sm:items-baseline sm:space-x-8">
              {filters.map((section, sectionIdx) => (
                <Popover
                  as="div"
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span>{section.name}</span>
                      {sectionHasFilter(section, selectedFilters) ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {selectedFilters[section.id]?.length}
                        </span>
                      ) : null}
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <form className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option.value}
                              checked={selectedFilters[section.id]?.includes(option.value)}
                              type="checkbox"
                              onClick={() => onSelect(section, option)}
                              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              ))}
            </Popover.Group>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Filter;
