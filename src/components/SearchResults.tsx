'use client';

import { type SearchResults as SearchResultsType } from "@/lib/sw_api";

const SearchResults = ({ results }: { results: SearchResultsType }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl flex-1 border border-gray-700 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold w-full pb-4 mb-4 text-gray-100 border-b border-gray-600">Results</h2>

      {results.length > 0 ? (
        <ul className="w-full space-y-4">
          {results.map((result) => (
            <li key={result.uid} className="text-gray-300">
              <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {result.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <svg
            className="w-16 h-16 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9.172 16.172L8 18m5.656-1.828L16 18M9.172 16.172a4 4 0 005.656 0" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4v-3m0 0a6 6 0 00-12 0v3m0 0a6 6 0 0012 0" />
          </svg>
          <p className="text-lg">There are zero matches.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;