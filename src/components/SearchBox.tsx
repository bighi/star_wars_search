'use client';

import { type SearchType } from "@/lib/sw_api";

interface SearchBoxProps {
  searchType: SearchType;
  onSearchTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchType, onSearchTypeChange, query, onQueryChange, onSearch, loading }) => {

  const buttonEnabled = query.trim().length > 0 && !loading;

  return (
    <div
      className="bg-white p-8 flex flex-col gap-[20px] flex-1 border rounded-sm text-[14px]"
      style={{ boxShadow: '0 1px 2px 0 var(--gray-warm)' }}
    >
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

        <button
          type="submit"
          disabled={!buttonEnabled}
          className={`w-full font-bold rounded-[20px] p-[8px] bg-gray-pinkish text-white text-bold transition-all duration-300 transform hover:scale-105 ${
            buttonEnabled ? 'bg-green-teal cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          {loading ? 'Searching...' : 'SEARCH'}
        </button>
      </form>
    </div>
  );
};

export default SearchBox;