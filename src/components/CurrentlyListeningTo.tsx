import { useEffect, useState } from "react";
import musicIcon from "../icons/music.svg?raw";

type CurrentlyPlaying = {
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
} | {
  isPlaying: false;
};

async function fetchCurrentlyPlaying(): Promise<CurrentlyPlaying> {
  try {
    const res = await fetch("https://workers.kopanko.com/currently-playing");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data as CurrentlyPlaying;
  } catch (error) {
    console.warn("Failed to fetch currently playing data:", error);
    return { isPlaying: false };
  }
}

const AlbumArtBase = ({ children }: { children: React.ReactNode }) => (
  <div className="w-16 h-16 rounded shrink-0">{children}</div>
);

const AlbumArt = ({ src, alt, href }: { src: string; alt: string; href: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AlbumArtBase>
      <div className="relative overflow-hidden w-full h-full rounded">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-300 dark:bg-stone-700 animate-pulse" />
        )}
        <a href={href} target="_blank" rel="noreferrer noopener" data-umami-event="Song click">
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover shadow-sm transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            onLoad={() => setImageLoaded(true)}
          />
        </a>
      </div>
    </AlbumArtBase>
  );
};

export default function CurrentlyListeningTo() {
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);

  useEffect(() => {
    fetchCurrentlyPlaying().then(setCurrentlyPlaying);
    
    const interval = setInterval(() => {
      fetchCurrentlyPlaying().then(setCurrentlyPlaying);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatArtists = (artists: string[]) =>
    artists
      .slice(0, 3)
      .join(", ")
      .concat(artists.length > 3 ? "..." : "");

  return (
    <div className="font-mono">
      <div className="flex items-center gap-4 flex-1">
        {currentlyPlaying === null && (
          <>
            <AlbumArtBase>
              <div className="bg-stone-300 dark:bg-stone-700 animate-pulse w-full h-full rounded overflow-hidden" />
            </AlbumArtBase>
            <div className="flex flex-col select-none flex-1 min-w-0 gap-1 max-w-xs">
              <div className="bg-stone-300 dark:bg-stone-700 animate-pulse h-5 rounded w-3/4"></div>
              <div className="bg-stone-300 dark:bg-stone-700 animate-pulse h-4 rounded w-1/2"></div>
            </div>
          </>
        )}

        {currentlyPlaying?.isPlaying && (
          <>
            <AlbumArt
              src={currentlyPlaying.album.art}
              alt={`${currentlyPlaying.album.name} album art`}
              href={currentlyPlaying.song.url}
            />
            <div className="flex flex-col flex-1 min-w-0">
              <a
                href={currentlyPlaying.song.url}
                className="font-bold hover:underline truncate"
                target="_blank"
                rel="noreferrer noopener"
                title={currentlyPlaying.song.name}
                data-umami-event="Song click"
              >
                {currentlyPlaying.song.name}
              </a>
              <span
                className="truncate text-sm text-balance"
                title={currentlyPlaying.song.artists.join(", ")}
              >
                {formatArtists(currentlyPlaying.song.artists)}
              </span>
            </div>
          </>
        )}

        {currentlyPlaying?.isPlaying === false && (
          <>
            <AlbumArtBase>
              <div className="bg-stone-200 dark:bg-stone-800 rounded flex items-center justify-center w-full h-full">
                <span
                  className="h-6 w-6 fill-stone-400 dark:fill-stone-500"
                  dangerouslySetInnerHTML={{ __html: musicIcon }}
                />
              </div>
            </AlbumArtBase>
            <div className="flex flex-col flex-1">
              <span className="font-bold">Not playing</span>
              <span>Spotify</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
