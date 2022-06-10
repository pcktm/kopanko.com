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
        <meta property="og:type" content="article" />
        <meta property="og:title" content={note.title} />
        <meta property="og:description" content={note.excerpt} />
        <meta property="og:image" key="ogimage" content={note.coverImage.url} />
        {note.tags && <meta name="keywords" content={note.tags.join(', ')} />}
      </Head>

      <section className={`main section ${styles.main}`}>

        <div className="container is-max-desktop">
          <div className="columns mb-6">
            <div className="column is-two-thirds">
              <h1 className="title is-1 is-size-2-mobile has-text-weight-bold">
                {note.title}
              </h1>
              <h2 className="subtitle is-5 mt-1 has-text-weight-light">
                {note.excerpt}
              </h2>
            </div>
          </div>

          <div className="columns is-centered">
            <div className="column ">
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

          <hr />
          <div className="content is-size-5 mb-4">
            <ReactMarkdown
              rehypePlugins={[rehypeHighlight]}
              components={componentMaps}
            >
              {note.content}
            </ReactMarkdown>
          </div>

          <hr />

          <div className="columns is-mobile">
            <div className="column">
              <p className="mb-1">{note?.tags?.map((v) => `#${v}`).join(', ')}</p>
            </div>
            <div className="column has-text-right">
              <p className="mb-1">{note.date}</p>
            </div>
          </div>

        </div>
      </section>
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
