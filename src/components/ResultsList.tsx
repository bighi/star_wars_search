'use client';

import { useRouter } from "next/navigation";
import { SearchType, type SearchResults } from "@/lib/sw_api";

const ResultsList = ({ results, loading, searchType }: { results: SearchResults; loading: boolean; searchType: SearchType }) => {
  const router = useRouter();

  if (loading) {
    return (
      <div className="p-8 min-h-[515px] flex-1 border border-gray-700 flex flex-col items-center justify-start">
        <h2 className="text-xl font-bold w-full pb-4 mb-4 border-b border-gray-600">Results</h2>
        <p className="text-lg self-center text-center grow">Searching...</p>
      </div>
    );
  }

  return (
    <div
      className="p-8 min-h-[515px] rounded-sm flex flex-1 bg-white border flex flex-col items-center justify-start"
      style={{ boxShadow: '0 1px 2px 0 var(--gray-warm)' }}
    >
      <h2 className="text-xl font-bold text-[18px] w-full pb-[10px] border-b-[0.5px]">Results</h2>

      {results.length > 0 ? (
        <ul className="w-full space-y-4">
          {results.map((result) => (
            <li key={result.uid} className="flex justify-between items-center">
              <span className="text-left flex-1">{result.name}</span>
              <button
                onClick={() => router.push(`/${searchType}/${result.uid}`)}
                className="px-4 py-2 font-semibold transition-all duration-300"
              >
                See details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col text-center flex-1 justify-center items-center text-gray-pinkish font-semibold">
          <p className="text-lg text-[14px]">There are zero matches.</p>
          <p className="text-lg text-[14px]">Use the form to search for People or Movies.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsList;