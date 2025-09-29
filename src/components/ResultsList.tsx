'use client';

import { type Movie, type Person, type SearchType } from "@/lib/sw_api";
import BasicBox from "./BasicBox"
import Button from "./Button"
import H2 from "./H2"

const ResultsList = ({ results, loading, searchType }: { results: (Movie[] | Person[]); loading: boolean; searchType: SearchType }) => {
  if (loading) {
    return (
      <BasicBox className="min-h-[635px]">
        <H2>Results</H2>
        <div className="flex flex-col flex-1 justify-center text-gray-pinkish font-semibold">
          <p className="text-[14px] self-center">Searching...</p>
        </div>
      </BasicBox>
    );
  }

  return (
    <BasicBox className="min-h-[635px]">
      <H2 className="mb-0">Results</H2>

      {results.length > 0 ? (
        <ul className="w-full space-y-4">
          {results.map((result) => (
            <li key={result.uid} className="flex justify-between items-center m-0 py-[8px] border-b">
              <span className="text-left flex-1 text-[15px] font-bold">
                {"name" in result.properties ? result.properties.name : result.properties.title}
              </span>
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