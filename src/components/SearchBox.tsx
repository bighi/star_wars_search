'use client';

const SearchBox = ({ searchType, onSearchTypeChange, query, onQueryChange, onSearch }) => {
  return (
    <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl flex-1 border border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-gray-100">What are you searching for?</h2>

      <form onSubmit={onSearch} className="space-y-6">
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="people"
              checked={searchType === 'people'}
              onChange={onSearchTypeChange}
              className="hidden"
            />
            <span className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors duration-300 ${
              searchType === 'people' ? 'border-blue-500' : 'border-gray-500'
            }`}>
              {searchType === 'people' && (
                <span className="absolute w-3 h-3 bg-blue-500 rounded-full transition-all duration-300 transform scale-100"></span>
              )}
            </span>
            <span className="ml-2 text-gray-300">People</span>
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="movies"
              checked={searchType === 'movies'}
              onChange={onSearchTypeChange}
              className="hidden"
            />
            <span className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors duration-300 ${
              searchType === 'movies' ? 'border-blue-500' : 'border-gray-500'
            }`}>
              {searchType === 'movies' && (
                <span className="absolute w-3 h-3 bg-blue-500 rounded-full transition-all duration-300 transform scale-100"></span>
              )}
            </span>
            <span className="ml-2 text-gray-300">Movies</span>
          </label>
        </div>

        <input
          type="text"
          placeholder={searchType === "people" ? "e.g. Chewbacca, Yoda, Boba Fett" : "e.g. Empire Strikes Back, A New Hope"}
          value={query}
          onChange={onQueryChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={!query.trim()}
          className={`w-full py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 ${
            !query.trim() ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default SearchBox;