import {gql, GraphQLClient} from 'graphql-request';
import {Variables} from 'graphql-request/dist/types';
import {Achievement, Note, Project} from './DTOs';

type Props = {
  locale?: string;
};

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
      slug
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

export async function getNote(slug: string | string[] | undefined): Promise<Note> {
  const query = gql`query getNote($slug: String!) {
    note(where: {slug: $slug}) {
      id
      slug
      targetURL
      excerpt
      richContent {
        json
        references {
          ... on Asset {
            id
            url
            mimeType
            width
            height
            placeholder: url(
              transformation: {
                document: { output: { format: png } }
                image: { resize: { width: 10, height: 10, fit: clip } }
                validateOptions: true
              }
            )
          }
        }
      }
      date
      tags
      title
      coverImage {
        url
        height
        width
        placeholder: url(
          transformation: {
            image: {   
              resize: { width: 10, height: 10, fit: clip }
            }
          }
        )
      }
    }
  }`;

  const {note} = await request<{note: Note}>(query, {slug});
  if (note.coverImage?.placeholder) {
    note.coverImage.placeholder = await imageURLToBase64(note.coverImage.placeholder);
  }
  const promises = note.richContent.references.map(async (reference) => {
    if (reference.placeholder) {
      return {
        ...reference,
        placeholder: await imageURLToBase64(reference.placeholder),
      };
    }
    return reference;
  });
  const newRefs = await Promise.all(promises);
  note.richContent.references = newRefs as any;
  return note;
}

export async function getProjects(props?: Props): Promise<Project[]> {
  const query = gql`query getProjects {
    projects(orderBy: priority_ASC, locales: [${props?.locale ?? 'en'}]) {
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
  const {projects} = await request<{projects: Project[]}>(query);
  for await (const project of projects) {
    if (project.coverImage?.placeholder) {
      project.coverImage.placeholder = await imageURLToBase64(project.coverImage.placeholder);
    }
  }
  return projects;
}

export async function getAchievements(props?: Props): Promise<Achievement[]> {
  const query = gql`query getAchievements {
    achievements(orderBy: priority_ASC, locales: [${props?.locale ?? 'en'}]) {
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
