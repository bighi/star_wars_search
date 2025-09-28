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
    films: string[];
    films_details?: Array<Movie>;
    url: string;
  };
};

type Movie = {
  uid: string;
  properties: {
    title: string;
    // episode_id: number;
    opening_crawl: string;
    // director: string;
    // producer: string;
    // release_date: string;
    characters: string[];
    character_details?: Array<any>; // Optional property to store character details
    // planets: string[];
    // starships: string[];
    // vehicles: string[];
    // species: string[];
    url: string;
  };
};

const Api = {
  personUrl: (id: string): string => {
    return `https://swapi.tech/api/people/${id}`;
  },

  movieUrl: (id: string): string => {
    return `https://swapi.tech/api/films/${id}`;
  },

  // Generalized fetch function, responsible for making API calls
  // and checking for errors.
  fetch: async (url: string): Promise<any> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  },

  search: async (searchType: SearchType, query: string): Promise<SearchResults> => {
    const endpoint = `https://swapi.tech/api/${searchType}/?search=${query}`;
    const data = await Api.fetch(endpoint);
    return data.results as SearchResults;
  },

  getPerson: async (url: string, includeMovies: boolean = false): Promise<Person> => {
    const data = await Api.fetch(url);
    const person = data.result as Person;

    if (includeMovies) {
      person.properties.films_details = await Promise.all(
        person.properties.films.map(async (filmUrl) => {
          return await Api.getMovie(filmUrl);
        })
      );
    }

    return person;
  },

  getMovie: async (url: string, getPeople: boolean = false): Promise<Movie> => {
    const data = await Api.fetch(url);
    const movie = data.result as Movie;

    if (getPeople) {
      movie.properties.character_details = await Promise.all(
        movie.properties.characters.map(async (characterUrl) => {
          return await Api.getPerson(characterUrl, false);
        })
      );
    }

    return movie;
  },
};

export default Api;
export type { SearchType, SearchResult, SearchResults, Person, Movie };
