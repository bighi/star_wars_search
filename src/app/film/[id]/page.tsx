import Api from "@/lib/sw_api";
import { type Movie } from "@/lib/sw_api";

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const movie: Movie = await Api.getMovie(Api.movieUrl(id), true);

    return (
      <section className="rounded-md shadow-md p-[15px] w-[800px] flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Movie Details</h1>
        <div className="flex w-full">
          {/* Left Column */}
          <div className="w-1/2 pr-4">
            <h2 className="text-xl font-semibold mb-2">Opening Crawl</h2>
            <p className="whitespace-pre-line">{movie.properties.opening_crawl}</p>
          </div>
          {/* Right Column */}
          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-semibold mb-2">Characters</h2>
            <p className="text-lg">
              {movie.properties.character_details?.map((character, index) => (
                <span key={character.uid}>
                  <a
                    href={`/people/${character.uid}`}
                    className="text-blue-500 hover:underline"
                  >
                    {character.properties.name}
                  </a>
                  {index < (movie.properties.character_details?.length ?? 0) - 1 && ", "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-lg">{error instanceof Error ? error.message : "An unexpected error occurred."}</p>
      </div>
    );
  }
}
