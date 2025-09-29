import BasicBox from "@/components/BasicBox"
import Button from "@/components/Button"
import H2 from "@/components/H2"
import Api from "@/lib/sw_api";
import { type Person } from "@/lib/sw_api";

export default async function PersonPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const person: Person = await Api.getPerson(Api.personUrl(id), true);

  return (
    <BasicBox className="w-full max-w-5xl">
      <h1 className="text-[18px] mb-[30px] font-bold">{person.properties.name}</h1>

      <div className="flex w-full gap-[100px]">
        {/* Left Column */}
        <div className="flex-1">
          <H2>Details</H2>
          <div className="text-[14px]">
            <p>Birth Year: {person.properties.birth_year}</p>
            <p>Gender: {person.properties.gender}</p>
            <p>Eye Color: {person.properties.eye_color}</p>
            <p>Hair Color: {person.properties.hair_color}</p>
            <p>Height: {person.properties.height}</p>
            <p>Mass: {person.properties.mass}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <H2>Movies</H2>
          <ul className="list-none">
            {person.properties.films_details?.map((film) => (
              <li key={film.uid}>
                <a href={`/movie/${film.uid}`} className="text-blue-500 hover:underline">
                  {film.properties.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex mt-[134px] w-[187px]">
        <Button as="link" href="/">
          BACK TO SEARCH
        </Button>
      </div>
    </BasicBox>
  );
}
