import { useState } from 'react';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';

export const ScraperTimer = () => {
  const [runEvery, setRunEvery] = useState(24);
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex w-full flex-col gap-y-3 rounded-lg border border-gray-300 p-6 text-gray-700 shadow-md">
      <div className="flex flex-row gap-x-4">
        <ScraperToggle enabled={enabled} setEnabled={setEnabled} />

        <div className="flex flex-col">
          <span className="font-medium">
            EU Scraper is{' '}
            <span
              className={classNames('font-medium', {
                'text-green-600': enabled,
                'text-red-600': !enabled,
              })}
            >
              {enabled ? 'enabled' : 'disabled'}
            </span>
          </span>
          <span className="text-sm text-gray-500">Disabling the scraper does not delete existing data</span>
        </div>
      </div>

      <div className="flex items-center">
        Runs every
        <input
          type="number"
          name="hours"
          id="hours"
          min={1}
          max={48}
          className="mx-2 block w-14 rounded-md border-0 p-[2px] text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          value={runEvery}
          onChange={(e) => setRunEvery(parseInt(e.target.value))}
        />
        hours.
      </div>

      <span className="text-sm text-gray-500">Next run: 6. April 10:30 UTC (in 2 hours)</span>
    </div>
  );
};

export const ScraperToggle = ({ enabled, setEnabled }: { enabled: boolean; setEnabled: (v: boolean) => void }) => {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-green-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 12 12">
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  );
};

export default ScraperTimer;
