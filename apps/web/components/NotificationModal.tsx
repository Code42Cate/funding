import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/24/outline';

const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

type Status = 'idle' | 'loading' | 'success' | 'failed' | 'invalid' | null;

export const NotificationModal = ({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) => {
  const cancelButtonRef = useRef(null);

  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<Status>(null);

  const submit = async (email: string) => {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.ok;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="text-center">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      Enable Funding Notifications
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Everytime we find new funding opportunities that match your request, we&apos;ll send you an
                        email. You can unsubscribe at any time, and we&apos;ll never spam you.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:gap-3">
                  <div>
                    <div className="mt-2 flex gap-x-2">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'invalid') {
                            setStatus(!validateEmail(email) ? 'invalid' : null);
                          }
                        }}
                        autoFocus
                        onBlur={() => {
                          setStatus(!validateEmail(email) ? 'invalid' : null);
                        }}
                        className={classNames(
                          'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6',
                          {
                            'border-red-500 ring-red-500 focus:ring-red-500': status === 'invalid',
                          }
                        )}
                        placeholder="you@example.com"
                        aria-describedby="email-description"
                      />
                      <button
                        type="button"
                        className={classNames(
                          'inline-flex min-w-fit items-center rounded-md bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-600 shadow-sm',
                          {
                            'cursor-not-allowed': status === 'loading' || status === 'invalid',
                            'hover:bg-purple-200 hover:text-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600':
                              status !== 'loading',
                          }
                        )}
                        onClick={async () => {
                          setStatus('loading');
                          if (validateEmail(email)) {
                            if (await submit(email)) {
                              setStatus('success');
                              setOpen(false);
                              setStatus(null);
                            } else {
                              setStatus('failed');
                              setTimeout(() => {
                                setStatus(null);
                              }, 3000);
                            }
                          } else {
                            setStatus('invalid');
                          }
                        }}
                        ref={cancelButtonRef}
                      >
                        {status === 'loading' && (
                          <div className="flex">
                            <div aria-label="Loading..." role="status">
                              <svg className="mr-2 h-5 w-5 animate-spin" viewBox="3 3 18 18">
                                <path
                                  className="fill-purple-100"
                                  d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
                                />
                                <path
                                  className="fill-purple-600"
                                  d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
                                />
                              </svg>
                            </div>
                            <span className="cursor-not-allowed text-sm text-purple-600">Loading</span>
                          </div>
                        )}

                        {status === 'success' && (
                          <div className="flex">
                            <CheckIcon strokeWidth={2} className="mr-2 h-5 w-5 text-purple-600" aria-hidden="true" />
                            <span className="text-sm text-purple-600">Subscribed</span>
                          </div>
                        )}

                        {(status === null || status === 'invalid') && <span>Notify me</span>}
                      </button>
                    </div>
                    {status === 'invalid' && (
                      <p className="mt-2 text-sm text-red-500" id="email-description">
                        Please enter a valid email address.
                      </p>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NotificationModal;
