import BasicBox from "@/components/BasicBox"
import Button from "@/components/Button"
import H2 from "@/components/H2"
import Api from "@/lib/sw_api";
import { type Movie } from "@/lib/sw_api";

export default async function MoviePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const movie: Movie = await Api.getMovie(Api.movieUrl(id), true);

  return (
    <BasicBox className="w-full max-w-5xl">
      <h1 className="text-[18px] mb-[30px] font-bold">{movie.properties.title}</h1>

      <div className="flex w-full gap-[100px]">
        {/* Left Column */}
        <div className="flex-1">
          <H2>Opening Crawl</H2>
          <p className="whitespace-pre-line text-[14px]">{movie.properties.opening_crawl}</p>
        </div>

        {/* Right Column */}
        <div className="flex-1">
          <H2>Characters</H2>
          <p className="text-[14px]">
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

      <div className="flex mt-[30px] w-[187px]">
        <Button as="link" href="/">
          BACK TO SEARCH
        </Button>
      </div>
    </BasicBox>
  );
}
