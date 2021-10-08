import { gql, GraphQLClient } from 'graphql-request'
import { Variables } from 'graphql-request/dist/types'
import { Achievement, Note, Project } from './DTOs';

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    authorization: `Bearer ${process.env.NODE_ENV === 'development' ? process.env.GRAPHCMS_DEV_AUTH_TOKEN : process.env.GRAPHCMS_PROD_AUTH_TOKEN}`,
  }
});

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
        url(transformation: {image: {resize: {height: 320, width: 640, fit: crop}}})
        height
        width
      }
    }
  }`
  return (await request<{notes: Note[]}>(query)).notes;
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
        url(transformation: {image: {resize: {height: 480, width: 800, fit: crop}}})
      }
    }
  }`
  return (await request<{projects: Project[]}>(query)).projects
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
        url(transformation: {image: {resize: {height: 480, width: 800, fit: crop}}})
      }
    }
  }`
  return (await request<{achievements: Achievement[]}>(query)).achievements
}