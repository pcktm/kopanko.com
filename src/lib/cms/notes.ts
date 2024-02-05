import type { Note } from "./types";
import { imageToCssPlaceholder, request } from "./utils";

export async function getAllNotes(): Promise<Note[]> {
  const query = `query getNotes {
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
  const notesWithPlaceholder = await Promise.all(notes.map(async (note) => {
    if (note.coverImage?.placeholder) {
      note.coverImage.placeholder = await imageToCssPlaceholder(note.coverImage.placeholder as any);
    }
    return note;
  }));
  return notesWithPlaceholder;
}


export async function getNoteBySlug(slug: string): Promise<Note> {
  const query = `query getNote($slug: String!) {
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
            caption
            fileName
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
    note.coverImage.placeholder = await imageToCssPlaceholder(note.coverImage.placeholder as any);
  }
  const promises = note.richContent.references.map(async (reference) => {
    if (reference.placeholder) {
      return {
        ...reference,
        placeholder: await imageToCssPlaceholder(reference.placeholder),
      };
    }
    return reference;
  });
  const newRefs = await Promise.all(promises);
  note.richContent.references = newRefs;
  return note;
}