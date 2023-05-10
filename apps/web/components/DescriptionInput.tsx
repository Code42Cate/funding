import { PaperClipIcon } from '@heroicons/react/20/solid';
import { useRef, useState } from 'react';
import { parseTextFromPdf } from '../utils/pdf';
import { parseTextFromTxt } from '../utils/txt';

export default function DescriptionInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [description, setDescription] = useState<string>('');

  const handleUpload = async () => {
    const file = inputRef.current?.files?.[0];

    if (!file) {
      return;
    }
    try {
      if (file.name.endsWith('.txt')) {
        setDescription(await parseTextFromTxt(file));
      } else if (file.name.endsWith('.pdf')) {
        setDescription(await parseTextFromPdf(file));
      }
    } catch (error) {
      console.error(error);
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
            <input type="file" className="sr-only" ref={inputRef} onChange={handleUpload} />
            <button
              onClick={() => inputRef.current?.click()}
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                Extract from file (.pdf or .txt)
              </span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
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
