'use client';

import { type SearchType } from "@/lib/sw_api";
import BasicBox from "./BasicBox"
import Button from "./Button";

interface SearchBoxProps {
  searchType: SearchType;
  onSearchTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchType, onSearchTypeChange, query, onQueryChange, onSearch, loading }) => {
  return (
    <BasicBox className="gap-[20px]">
      <h2>What are you searching for?</h2>

      <form onSubmit={onSearch} className="space-y-6">
        <div className="flex items-center gap-[30px] font-bold">
          <label className="flex gap-[8px] items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="people"
              checked={searchType === 'people'}
              onChange={onSearchTypeChange}
            />
            <span>People</span>
          </label>

          <label className="flex gap-[8px] items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="movies"
              checked={searchType === 'movies'}
              onChange={onSearchTypeChange}
            />
            <span>Movies</span>
          </label>
        </div>

        <input
          type="text"
          placeholder={searchType === "people" ? "e.g. Luke Skywalker, Obi-Wan Kenobi" : "e.g. Empire Strikes Back, A New Hope"}
          value={query}
          onChange={onQueryChange}
          className="w-full rounded-xs p-[10px] border border-gray-soft focus:outline-none focus:border-[#383838] transition-all duration-300"
        />

        <Button
          type="submit"
          disabled={query.trim().length === 0}
          loading={loading}
          loadingText="Searching..."
        >
          SEARCH
        </Button>
      </form>
    </BasicBox>
  );
};

export default SearchBox;