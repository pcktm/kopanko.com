/* eslint-disable jsx-a11y/alt-text */
import {getNote, getNotes} from 'lib/cms';
import {Note as DNote} from 'lib/DTOs';
import {GetStaticPaths, GetStaticProps} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import 'highlight.js/styles/tokyo-night-dark.css';
import styles from 'styles/note.module.scss';
import {RichText, NodeRendererType} from '@graphcms/rich-text-react-renderer';
import Balancer from 'react-wrap-balancer';
import CodeBlock from 'components/elements/codeBlock';
import Comments from 'components/elements/comments';
import ElectionCountdown from 'components/elements/electionsCountdown';

const customRenderers: NodeRendererType = {
  Asset: {
    image(props) {
      if (!props.url) return null as any;
      return (
        <span className="columns is-centered my-1">
          <span className="column is-four-fifths is-flex is-flex-direction-column is-align-content-center is-justify-content-center">
            <div className="is-flex is-justify-content-center">
              <Image
                className={styles.image}
                src={props.url}
                width={props.width}
                height={props.height}
                placeholder={props.placeholder ? 'blur' : 'empty'}
                blurDataURL={props.placeholder}
              />
            </div>
            {props.caption && (
              <span className="mt-1 has-text-grey is-size-6 has-text-weight-light has-text-centered">
                {props.caption}
              </span>
            )}
          </span>
        </span>
      );
    },
  },
  img(props) {
    if (!props.src) return null as any;
    return (
      <span className="columns is-centered">
        <span className="column is-four-fifths-tablet is-flex is-justify-content-center">
          <Image className={styles.image} src={props.src} width={props.width} height={props.height} />
        </span>
      </span>
    );
  },
  code_block(props) {
    return (
      <CodeBlock>
        {props.children}
      </CodeBlock>
    );
  },
  table(props) {
    return (
      <div className="table-container">
        <table className="table is-fullwidth">
          {props.children}
        </table>
      </div>
    );
  },
  a(props) {
    const isExternal = new URL(props.href ?? '').hostname !== 'kopanko.com';

    return (
      <a href={props.href} target={isExternal ? '_blank' : '_self'} rel={isExternal ? 'noopener noreferrer' : ''}>
        {props.children}
      </a>
    );
  },
  class(props) {
    if (props.className === 'infobox') {
      return (
        <div className="notification is-info is-light">
          {props.children}
        </div>
      );
    }
    if (props.className === 'elections-countdown') {
      return <ElectionCountdown />;
    }
    return <div>{props.children}</div>;
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

        <main className="container is-max-desktop">
          <div className="columns mb-6">
            <div className="column is-two-thirds">

              <h1 className="title is-1 is-size-2-mobile has-text-weight-bold">
                <Balancer>
                  {note.title}
                </Balancer>
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
                    quality={100}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />
          <article className="content mb-4">
            <RichText
              content={note.richContent.json}
              references={note.richContent.references}
              renderers={customRenderers}
            />
          </article>

          <hr />

          <div>
            <Comments term={note.title} />
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

        </main>
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
