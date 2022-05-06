import {gql, GraphQLClient} from 'graphql-request';
import {Variables} from 'graphql-request/dist/types';
import {Achievement, Note, Project} from './DTOs';

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT ?? '', {
  headers: {
    authorization: `Bearer ${process.env.NODE_ENV === 'development' ? process.env.GRAPHCMS_DEV_AUTH_TOKEN : process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
  },
});

export async function imageURLToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const buf = await response.arrayBuffer();
  const b64 = Buffer.from(buf).toString('base64');
  // console.log(`data:${response.headers.get('content-type') ?? 'image/jpeg'};base64,${b64}`);
  return `data:${response.headers.get('content-type') ?? 'image/jpeg'};base64,${b64}`;
}

export async function request<T = any, V = Variables>(query: string, variables?: V): Promise<T> {
  return client.request<T, V>(query, variables);
}

export async function getNotes(): Promise<Note[]> {
  const query = gql`query getNotes {
    notes(orderBy: date_DESC) {
      id
      targetURL
      excerpt
      date
      tags
      title
      coverImage {
        url
        height
        width
        placeholder: url(
          transformation: {
            image: { resize: { width: 10, height: 10, fit: clip } }
          }
        )
      }
    }
  }`;
  const {notes} = await request<{notes: Note[]}>(query);
  for await (const note of notes) {
    if (note.coverImage?.placeholder) {
      note.coverImage.placeholder = await imageURLToBase64(note.coverImage.placeholder);
    }
  }
  return notes;
}

export async function getProjects(): Promise<Project[]> {
  const query = gql`query getProjects {
    projects(orderBy: priority_ASC) {
      tagline
      title
      id
      action
      isMinor
      description {
        html
      }
      coverImage {
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
  const {projects} = await request<{projects: Project[]}>(query);
  for await (const project of projects) {
    if (project.coverImage?.placeholder) {
      project.coverImage.placeholder = await imageURLToBase64(project.coverImage.placeholder);
    }
  }
  return projects;
}

export async function getAchievements(): Promise<Achievement[]> {
  const query = gql`query getAchievements {
    achievements(orderBy: priority_ASC) {
      id
      title
      tagline
      action
      isMinor
      description {
        html
      }
      coverImage {
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
  const {achievements} = await request<{achievements: Achievement[]}>(query);
  for await (const achievement of achievements) {
    if (achievement.coverImage?.placeholder) {
      achievement.coverImage.placeholder = await imageURLToBase64(achievement.coverImage.placeholder);
    }
  }
  return achievements;
}
