import {InferGetStaticPropsType} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {getNotes} from '../lib/cms'
import { Note } from '../lib/DTOs'
import ellipsize from 'ellipsize'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'



function LargePost({note}: {note: Note}) {
  return <a className="is-clickable" href={note.targetURL} target="_blank" css={css`margin-bottom: 35px !important; color: inherit;`}>
    <div className="columns is-variable is-5 is-vcentered">
      <div className="column is-two-thirds">
        <div className="card">
          <div className="card-image">
            <figure className="image is-2by1">
              <img src={note.coverImage.url} />
            </figure>
          </div>
        </div>
      
      </div>
      <div className="column">
        <p>{note.date}</p>
        <h2 className="title is-2 is-size-3-mobile">{note.title}</h2>
        <h4 className="subtitle is-4">{ellipsize(note.excerpt, 145)}</h4>
        <p>{note.tags.map(v => "#" + v).join(', ')}</p>
      </div>
    </div>
  </a>
}

function SmallPost({note}: {note: Note}) {
  return <a className="is-clickable" href={note.targetURL} target="_blank" css={css`margin-bottom: 35px !important; color: inherit;`}>
    <div className="columns is-vcentered">
      <div className="column is-one-fifth">
        <div className="card" >
          <div className="card-image">
            <figure className="image is-2by1">
              <img src={note.coverImage.url} />
            </figure>
          </div>
        </div>
      </div>
      <div className="column is-three-fifths">
        <p>{note.date}</p>
        <h4 className="title is-4">{note.title}</h4>
        <h6 className="subtitle is-6">{ellipsize(note.excerpt, 170)}</h6>
      </div>
    </div>
  </a>
}

export default function Notes({ notes }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Notes ● Jakub Kopańko</title>
        <meta name="description" content="Random lighthearted things and some advanced datamoshing guides." />
      </Head>
      <div className="main section">
        <div className="container">
          <h1 className="title is-1 is-size-2-mobile">
            Notes
          </h1>
          {notes.length > 0 ? <>
            <LargePost note={notes[0]}/>
            {notes.length > 1 && <hr></hr>}
            {notes.slice(1).map(note => <SmallPost key={note.id} note={note}/>)}
            
          
          </>
          : <h2 className="subtitle is-3">No notes here, yet.</h2> }
        </div>
      </div>
    </div>
  )
}

export const getStaticProps = async (context) => {
  return {
    props: {
      notes: await getNotes(),
    },
    revalidate: 60*60,
  }
}
