'use client';

import { useRouter } from "next/navigation";
import { SearchType, type SearchResults } from "@/lib/sw_api";
import BasicBox from "./BasicBox"
import Button from "./Button"

const ResultsList = ({ results, loading, searchType }: { results: SearchResults; loading: boolean; searchType: SearchType }) => {
  const router = useRouter();

  if (loading) {
    return (
      <BasicBox className="min-h-[635px]">
        <h2 className="text-xl font-bold text-[18px] w-full pb-[10px] border-b-[0.5px]">Results</h2>;
        <div className="flex flex-col flex-1 justify-center text-gray-pinkish font-semibold">
          <p className="text-[14px] self-center">Searching...</p>
        </div>
      </BasicBox>
    );
  }

  return (
    <BasicBox className="min-h-[635px]">
      <h2 className="text-xl font-bold text-[18px] w-full pb-[10px] border-b-[0.5px]">Results</h2>

      {results.length > 0 ? (
        <ul className="w-full space-y-4">
          {results.map((result) => (
            <li key={result.uid} className="flex justify-between items-center m-0 py-[8px] border-b">
              <span className="text-left flex-1 text-[15px] font-bold">{result.name}</span>
              <div className="flex w-[134px]">
                <Button as="link" href={`/${searchType}/${result.uid}`}>
                  SEE DETAILS
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col text-center flex-1 justify-center items-center text-gray-pinkish font-semibold">
          <p className="text-lg text-[14px]">There are zero matches.</p>
          <p className="text-lg text-[14px]">Use the form to search for People or Movies.</p>
        </div>
      )}
    </BasicBox>
  );
};

export default ResultsList;