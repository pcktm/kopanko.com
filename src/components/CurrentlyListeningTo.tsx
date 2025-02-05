import { useEffect, useState } from "react";
import musicIcon from "@hackernoon/pixel-icon-library/icons/SVG/regular/music.svg?raw";

type CurrentlyPlayingCond<IsPlaying extends boolean> = IsPlaying extends true
  ? {
      isPlaying: true;
      isExplicit: boolean;
      song: {
        name: string;
        artists: string[];
        url: string;
      };
      album: {
        name: string;
        art: string;
      };
    }
  : {
      isPlaying: false;
    };

type CurrentlyPlaying =
  | CurrentlyPlayingCond<true>
  | CurrentlyPlayingCond<false>;

async function fetchCurrentlyPlaying() {
  const res = await fetch("https://workers.kopanko.com/currently-playing");
  const data = await res.json();
  return data as CurrentlyPlaying;
}

export default function CurrentlyListeningTo() {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);

  useEffect(() => {
    fetchCurrentlyPlaying().then(setCurrentlyPlaying);
  }, []);

  return (
    <div className="font-mono">
      <div className="flex items-center gap-4">
        <span
          className="h-5 w-5 shrink-0 fill-current"
          dangerouslySetInnerHTML={{ __html: musicIcon }}
        />
        <div>
          {currentlyPlaying === null && (
            <div className="flex flex-col select-none animate-pulse">
              <span className="bg-stone-300 text-transparent w-40 font-bold">Song name</span>
              <span className="bg-stone-300 text-transparent w-24">Artist</span>
            </div>
          )}
          {currentlyPlaying?.isPlaying && (
            <div className="flex flex-col">
              <a
                href={currentlyPlaying.song.url}
                className="font-bold hover:underline text-balance"
                target="_blank"
                rel="noreferrer noopener"
              >
                {currentlyPlaying.song.name}
              </a>
              <span>
                {currentlyPlaying.song.artists
                  .slice(0, 3)
                  .join(", ")
                  .concat(
                    currentlyPlaying.song.artists.length > 3 ? "..." : "",
                  )}
              </span>
            </div>
          )}
          {currentlyPlaying?.isPlaying === false && (
            <div className="flex flex-col">
              <span className="font-bold">Not playing</span>
              <span>Spotify</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
