'use client';

import SearchBox from "@/components/SearchBox";
import SearchResults from "@/components/SearchResults";
import { useState } from "react";
import Api, { type SearchType, type SearchResults as ApiSearchResults } from "@/lib/sw_api";

export default function Home() {
  const [searchType, setSearchType] = useState<SearchType>('people');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ApiSearchResults>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await Api.search(searchType, query);
    setSearchResults(data); // Store the search results in state
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900 text-gray-200 font-sans">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <SearchBox
          searchType={searchType}
          onSearchTypeChange={(e) => setSearchType(e.target.value as SearchType)}
          query={query}
          onQueryChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
        />
        <SearchResults results={searchResults} />
      </div>
    </div>
  );
}


