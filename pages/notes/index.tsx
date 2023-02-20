import {InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import ellipsize from 'ellipsize';
import {getNotes} from 'lib/cms';
import {Note} from 'lib/DTOs';
import Image from 'next/image';
import Link from 'next/link';

function LinkHOC({note, children}: {note: Note, children: React.ReactNode}) {
  return (
    <Link
      href={`/notes/${note.slug}`}
    >
      {children}
    </Link>
  );
}

function LargePost({note, style}: {note: Note, style?: React.CSSProperties}) {
  return (
    <div style={style}>
      <LinkHOC note={note}>
        <div
          className="is-clickable"
          style={{
            marginBottom: '35px !important',
            color: 'inherit',
          }}
        >
          <div className="columns is-variable is-4 is-vcentered">
            <div className="column is-three-fifths">
              <div className="card">
                <div className="card-image">
                  <Image
                    src={note.coverImage.url}
                    width={note.coverImage.width}
                    height={note.coverImage.height}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={note.coverImage.placeholder}
                    alt="Large article cover"
                  />
                </div>
              </div>

            </div>
            <div className="column">
              <p>{note.date}</p>
              <h2 className="title is-2 is-size-3-mobile has-text-weight-bold">{note.title}</h2>
              <h4 className="subtitle is-4">{ellipsize(note.excerpt, 145)}</h4>
              <p className="has-text-weight-light">{note?.tags?.map((v) => `#${v}`).join(', ')}</p>
            </div>
          </div>
        </div>
      </LinkHOC>
    </div>
  );
}

LargePost.defaultProps = {
  style: {},
};

function SmallPost({note}: {note: Note}) {
  return (
    <LinkHOC note={note}>
      <div
        className="is-clickable"
        style={{
          marginBottom: '35px !important',
          color: 'inherit',
        }}
      >
        <div className="columns is-vcentered">
          <div className="column is-one-fifth">
            <div className="card">
              <div className="card-image">
                <Image
                  src={note.coverImage.url}
                  width={note.coverImage.width}
                  height={note.coverImage.height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={note.coverImage.placeholder}
                  alt="Small article cover"
                />
              </div>
            </div>
          </div>
          <div className="column is-three-fifths">
            <p>{note.date}</p>
            <h4 className="title is-4">{note.title}</h4>
            <h6 className="subtitle is-6">{ellipsize(note.excerpt, 170)}</h6>
          </div>
        </div>
      </div>
    </LinkHOC>
  );
}

export default function Notes({notes}: InferGetStaticPropsType<typeof getStaticProps>) {
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
          {notes.length > 0 ? (
            <>
              <LargePost note={notes[0]} style={{marginBottom: notes.length > 1 ? '30px' : 0}} />
              {notes.slice(1).map((note) => <SmallPost key={note.id} note={note} />)}

            </>
          )
            : <h2 className="subtitle is-3">No notes here, yet.</h2> }
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    notes: await getNotes(),
  },
  revalidate: 60 * 60,
});
