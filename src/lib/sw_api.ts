type SearchType = "people" | "movies";

type SearchResult = {
  uid: string;
  name: string;
  url: string;
};

type SearchResults = SearchResult[];

const Api = {
  search: async (searchType: SearchType, query: string): Promise<SearchResults> => {
    try {
      const endpoint = searchType === "people" ? "https://swapi.tech/api/people/" : "https://swapi.tech/api/films/";
      const response = await fetch(`${endpoint}?search=${encodeURIComponent(query)}`);
      console.log("Fetching from:", `${endpoint}?search=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results as SearchResults;

    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};

export default Api;
export type { SearchType, SearchResult, SearchResults }
