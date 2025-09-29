'use client';

import Head from "next/head";
import SearchBox from "@/components/SearchBox";
import ResultsList from "@/components/ResultsList";
import { useState } from "react";
import Api, { type SearchType, type Movie, type Person } from "@/lib/sw_api";

export default function Home() {
  const [searchType, setSearchType] = useState<SearchType>('people');
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Person[] | Movie[]>([]);
  const [loading, setLoading] = useState(false);

  // Call our internal API to save the search query
  const saveQueryToDatabase = async (searchType: SearchType, query: string) => {
    await fetch("/api/save-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchType, query }),
    });
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveQueryToDatabase(searchType, query);
    const searchResults = await Api.search(searchType, query);
    setSearchResults(searchResults);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Star Wars Search</title>
      </Head>

      <div className="flex flex-col md:flex-row gap-[30px] items-start w-full max-w-5xl bg-[#ededed]">
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
    </>
  );
}
