import {getNote, getNotes} from 'lib/cms';
import {Note as DNote} from 'lib/DTOs';
import {GetStaticPaths, GetStaticProps} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/tokyo-night-dark.css';
import styles from 'styles/note.module.scss';

const componentMaps = {
  pre(props: any) {
    return <pre style={{padding: '0 0', borderRadius: '4px'}} {...props} />;
  },
  img(props: any) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <span className="is-flex is-justify-content-center"><img className={styles.image} {...props} /></span>;
  },
};

export default function Note({note}: {note: DNote}) {
  return (
    <>
      <Head>
        <title>
          {note.title}
        </title>
        <meta name="description" content={note.excerpt} />
        <meta property="og:title" content={note.title} />
        <meta property="og:description" content={note.excerpt} />
        <meta property="og:image" content={note.coverImage.url} />
        {note.tags && <meta name="keywords" content={note.tags.join(', ')} />}
      </Head>

      <div className={`main section ${styles.main}`}>
        <div className="container is-max-desktop">
          <div
            className="columns is-centered"
            style={{
              marginBottom: '35px',
            }}
          >
            <div className="column is-three-quarters">
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
          </div>
          <h2 className="subtitle is-size-5-mobile is-4">
            {note.date}
          </h2>
          <h1 className="title is-1 is-size-3-mobile mb-1">
            {note.title}
          </h1>
          <p className="mb-5">{note?.tags?.map((v) => `#${v}`).join(', ')}</p>
          <div className="content is-size-5 mb-4">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              components={componentMaps}
            >
              {note.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const note = await getNote(params?.slug);
  if (!note) return {notFound: true};
  return {
    props: {
      note,
    },
    revalidate: 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await getNotes();
  const paths = notes.map((note) => ({
    params: {
      slug: note.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
