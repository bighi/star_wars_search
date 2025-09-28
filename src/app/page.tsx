'use client';

import Head from "next/head";
import SearchBox from "@/components/SearchBox";
import ResultsList from "@/components/ResultsList";
import { useState } from "react";
import Api, { type SearchType, type SearchResults } from "@/lib/sw_api";

export default function Home() {
  const [searchType, setSearchType] = useState<SearchType>('people');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const searchResults = await Api.search(searchType, query);
    setSearchResults(searchResults);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Star Wars Search</title>
      </Head>

      <div className="flex justify-center items-center min-h-screen p-4 bg-gray-900 text-gray-200 font-sans">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <SearchBox
            searchType={searchType}
            onSearchTypeChange={(e) => setSearchType(e.target.value as SearchType)}
            query={query}
            onQueryChange={(e) => setQuery(e.target.value)}
            onSearch={handleSearch}
            loading={loading}
          />
          <ResultsList results={searchResults} loading={loading} searchType={searchType} />
        </div>
      </div>
    </>
  );
}


