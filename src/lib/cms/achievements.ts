import type { Achievement } from "./types";
import { imageToCssPlaceholder, request } from "./utils";

type Props = {
  locale?: string;
};

export async function getAchievements(props?: Props): Promise<Achievement[]> {
  const query = `query getAchievements {
    achievements(orderBy: priority_ASC, locales: [${props?.locale ?? "en"}]) {
      id
      title
      tagline
      action
      isMinor
      description {
        html
      }
      coverImage(locales: en) {
        url
        width
        height
        caption
        placeholder: url(
          transformation: {
            image: { resize: { width: 10, height: 10, fit: clip } }
          }
        )
      }
    }
  }`;
  const { achievements } = await request<{ achievements: Achievement[] }>(
    query,
  );
  const achievementsWithPlaceholder = await Promise.all(
    achievements.map(async (ach) => {
      if (ach.coverImage?.placeholder) {
        ach.coverImage.placeholder = await imageToCssPlaceholder(
          ach.coverImage.placeholder as any,
        );
      }
      return ach;
    }),
  );
  return achievementsWithPlaceholder;
}
