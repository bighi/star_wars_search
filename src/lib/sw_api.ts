type SearchType = "people" | "movies";

type SearchResult = {
  uid: string;
  name: string;
  url: string;
};

type SearchResults = SearchResult[];

type Person = {
  uid: string;
  properties: {
    name: string;
    height: string;
    mass: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    eye_color: string;
    birth_year: string;
    homeworld: string;
    films: Array<string | { id: string; name: string }>; // Allow both URLs and transformed objects
    url: string;
  };
};

type Movie = {
  uid: string;
  properties: {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: string[];
    planets: string[];
    starships: string[];
    vehicles: string[];
    species: string[];
    url: string;
  };
};

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

  getPerson: async (id: string): Promise<Person> => {
    try {
      const endpoint = `https://swapi.tech/api/people/${id}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const person = data.result as Person; // Assuming the API returns a 'result' field with the person data

      // Fetch movie details for each film URL
      const filmDetails = await Promise.all(
        person.properties.films
          .filter((filmUrl): filmUrl is string => typeof filmUrl === "string") // Ensure only strings are passed
          .map(async (filmUrl) => {
            const filmResponse = await fetch(filmUrl);

            if (!filmResponse.ok) {
              throw new Error(`HTTP error! status: ${filmResponse.status}`);
            }

            const filmData = await filmResponse.json();
            return {
              id: filmData.result.uid, // Assuming 'uid' is the movie ID
              name: filmData.result.properties.title, // Assuming 'title' is the movie name
            };
          })
      );

      // Update the films property with the transformed data
      person.properties.films = filmDetails;

      return person;
    } catch (error) {
      console.error("Error fetching person data:", error);
      throw error;
    }
  },

  getMovie: async (id: string): Promise<Movie> => {
    try {
      const endpoint = `https://swapi.tech/api/films/${id}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result as Movie; // Assuming the API returns a 'result' field with the movie data
    } catch (error) {
      console.error("Error fetching movie data:", error);
      throw error;
    }
  },
};

export default Api;
export type { SearchType, SearchResult, SearchResults, Person, Movie };
