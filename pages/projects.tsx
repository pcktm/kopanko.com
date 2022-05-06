import {InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import Card from 'components/elements/card';
import {getProjects} from 'lib/cms';
import {Project} from 'lib/DTOs';

function ProjectCard({project}: {project: Project}) {
  return (
    <Card
      title={project.title}
      subtitle={project.tagline}
      image={project.coverImage}
      content={project.description?.html}
      action={project.action}
    />
  );
}

function MinorProject({item}: {item: Project}) {
  return (
    <>
      {item?.action?.url?.length ?? -1 > 0
        ? (
          <a href={item?.action?.url} target="_blank" rel="noreferrer">
            <span className="icon-text">
              {/* todo: fix margin here */}
              <h5 className="title is-5" style={{marginBottom: '0px'}}>{item.title}</h5>
              <span className="icon">
                <i className="ri-external-link-line" />
              </span>
            </span>
          </a>
        )
        : <h5 className="title is-5" style={{marginBottom: '0px'}}>{item.title}</h5>}
      <h6 className="subtitle is-6">{item.tagline}</h6>
      { /* eslint-disable-next-line react/no-danger */ }
      <span dangerouslySetInnerHTML={{__html: item.description?.html ?? ''}} className="content" />
    </>
  );
}

export default function Projects({projects}: InferGetStaticPropsType<typeof getStaticProps>) {
  const major = projects.filter((a) => !a.isMinor);
  const minor = projects.filter((a) => a.isMinor);

  return (
    <div>
      <Head>
        <title>Projects ● Jakub Kopańko</title>
        <meta name="description" content="My personal projects and ventures." />
      </Head>
      <div className="main section">
        <div className="container">
          <h1 className="title is-1 is-size-2-mobile">Projects</h1>
          <h2 className="subtitle is-3">My personal projects and ventures.</h2>

          <br />

          <div className="columns is-multiline">
            <div className="column">
              {major.filter((p, i) => i % 2 === 0).map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            <div className="column">
              {major.filter((p, i) => i % 2 !== 0).map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          </div>

          <br />
          {minor.length > 0 && <h3 className="title is-3">More projects</h3>}
          {
            minor.map((project) => (
              <div key={project.id}>
                <MinorProject item={project} />
                <hr />
              </div>
            ))
          }
        </div>
      </div>

    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    projects: await getProjects(),
  },
  revalidate: 60 * 60,
});
