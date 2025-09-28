import Api from "@/lib/sw_api";
import { type Person } from "@/lib/sw_api";

export default async function PersonPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const person: Person = await Api.getPerson(Api.personUrl(id), true);

    return (
      <section className="rounded-md shadow-md p-[15px] w-[800px] flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Person Details</h1>
        <div className="flex w-full">
          {/* Left Column */}
          <div className="w-1/2 pr-4">
            <div className="text-lg">
              <p><strong>Birth Year:</strong> {person.properties.birth_year}</p>
              <p><strong>Gender:</strong> {person.properties.gender}</p>
              <p><strong>Eye Color:</strong> {person.properties.eye_color}</p>
              <p><strong>Hair Color:</strong> {person.properties.hair_color}</p>
              <p><strong>Height:</strong> {person.properties.height}</p>
              <p><strong>Mass:</strong> {person.properties.mass}</p>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-semibold mb-2">Movies</h2>
            <ul className="list-disc pl-5">
              {person.properties.films_details?.map((film) => (
                <li key={film.uid}>
                  <a href={`/film/${film.uid}`} className="text-blue-500 hover:underline">
                    {film.properties.title}
                  </a>
                </li>
              ))}
            </ul>
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
