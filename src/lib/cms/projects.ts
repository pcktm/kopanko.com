import type { Project } from "./types";
import { imageToCssPlaceholder, request } from "./utils";

type Props = {
  locale?: string;
};

export async function getProjects(props?: Props): Promise<Project[]> {
  const query = `query getProjects {
    projects(orderBy: priority_ASC, locales: [${props?.locale ?? "en"}]) {
      tagline
      title
      id
      action
      isMinor
      description {
        html
      }
      coverImage(locales: en) {
        url
        width
        height
        placeholder: url(
          transformation: {
            image: { resize: { width: 10, height: 10, fit: clip } }
          }
        )
      }
    }
  }`;
  const { projects } = await request<{ projects: Project[] }>(query);
  const projectsWithPlaceholder = await Promise.all(
    projects.map(async (project) => {
      if (project.coverImage?.placeholder) {
        project.coverImage.placeholder = await imageToCssPlaceholder(
          project.coverImage.placeholder as any,
        );
      }
      return project;
    }),
  );
  return projectsWithPlaceholder;
}
