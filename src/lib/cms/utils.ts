import { blurhashToCssGradientString } from "@unpic/placeholder";
import { encode } from "blurhash";
import { getPixels } from "@unpic/pixels";
import { getImage } from "astro:assets";
import type { GetImageResult, ImageTransform } from "astro";

export const request = async <D>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<D> => {
  if (
    !import.meta.env.HYGRAPH_ENDPOINT ||
    !import.meta.env.HYGRAPH_AUTH_TOKEN
  ) {
    throw new Error(
      "HYGRAPH_ENDPOINT and HYGRAPH_AUTH_TOKEN must be set in .env",
    );
  }
  const data = await fetch(import.meta.env.HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.HYGRAPH_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await data.json();
  return json.data as D;
};

export async function imageURLToBlurhash(
  url: string,
): Promise<string | undefined> {
  try {
    const pixels = await getPixels(url);
    const data = new Uint8ClampedArray(pixels.data);
    return encode(data, pixels.width, pixels.height, 4, 4);
  } catch (e) {
    console.error(e, url);
    return undefined;
  }
}

export async function imageToCssPlaceholder(url: string): Promise<
  | {
      css: string;
      jsx: { background: string };
    }
  | undefined
> {
  const blurhash = await imageURLToBlurhash(url);
  if (blurhash) {
    const gradient = blurhashToCssGradientString(blurhash);
    return {
      css: `background: ${gradient};`,
      jsx: { background: gradient },
    };
  }
  return undefined;
}

export async function cacheRemoteImage(url: string, format: ImageTransform['format'] = 'webp'): Promise<GetImageResult> {
  return getImage({
    src: url,
    format,
    inferSize: true,
  });
}