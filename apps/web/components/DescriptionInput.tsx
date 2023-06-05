import { CheckIcon, PaperClipIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useRef, useState } from 'react';
import { parseTextFromPdf } from '../utils/pdf';
import { parseTextFromTxt } from '../utils/txt';

export default function DescriptionInput({ onSearch }: { onSearch: (description: string) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState<string>('');

  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'success' | 'failed' | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];

    if (!file) {
      return;
    }

    setFilename(file.name);
    setUploadStatus('uploading');
    try {
      if (file.name.endsWith('.txt')) {
        setDescription(await parseTextFromTxt(file));
      } else if (file.name.endsWith('.pdf')) {
        setDescription(await parseTextFromPdf(file));
      }

      setUploadStatus('success');

      // remove success message after 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
    } catch (error) {
      setUploadStatus('failed');
    }
  };

  return (
    <form action="#" className="relative">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500">
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={8}
          name="description"
          id="description"
          className="block w-full resize-none border-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:leading-6"
          placeholder="Who are you and what are you searching funding for? Be as detailed as possible."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="absolute inset-x-px bottom-0 rounded-lg bg-white">
        <div className="flex items-center justify-between space-x-3 rounded-lg border-b border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            {uploadStatus === null && (
              <>
                <input type="file" className="sr-only" ref={inputRef} onChange={handleUpload} />
                <button
                  onClick={() => inputRef.current?.click()}
                  type="button"
                  className="group -my-2 -ml-2 inline-flex items-center rounded-md px-3 py-2 text-left text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
                  <span className="text-sm text-gray-500 group-hover:text-gray-600">
                    Extract from file <span className="italic">(.pdf or .txt)</span>
                  </span>
                </button>
              </>
            )}
            {uploadStatus === 'uploading' && (
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
                <span className="text-sm text-gray-500 group-hover:text-gray-600">
                  Reading text from file {filename}
                </span>
              </div>
            )}
            {uploadStatus === 'success' && (
              <div className="flex">
                <div aria-label="Success" role="status">
                  <CheckIcon className="mr-2 h-5 w-5 text-purple-500" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-600">
                  Successfully read text from {filename}
                </span>
              </div>
            )}
            {uploadStatus === 'failed' && (
              <div className="flex">
                <div aria-label="Success" role="status">
                  <XMarkIcon className="mr-2 h-5 w-5 text-red-500" aria-hidden="true" />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-gray-600">
                  Failed to read text from {filename}, please copy and paste manually
                </span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => onSearch(description)}
              type="button"
              className="inline-flex items-center rounded-md bg-purple-100 px-3 py-2 text-sm font-semibold text-purple-600 shadow-sm hover:bg-purple-200 hover:text-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Find me money
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
