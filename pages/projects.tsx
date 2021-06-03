import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/elements/card'
import { getProjects } from '../lib/cms'
import { Project } from '../lib/DTOs'

function ProjectCard({project}: {project: Project}) {
  return (
    <Card
      title={project.title}
      subtitle={project.tagline}
      imageUrl={project.coverImage?.url}
      content={project.description.html}
    ></Card>
  )
}

export default function Projects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const h1 = projects.filter((p, i) => i % 2 === 0);
  const h2 = projects.filter((p, i) => i % 2 !== 0);
  
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
            
          <br></br>

          <div className="columns is-multiline">
            <div className="column">
              {h1.map(project => {
                return <ProjectCard project={project} />
              })}
            </div>
            <div className="column">
              {h2.map(project => {
                return <ProjectCard key={project.id} project={project} />
              })}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export const getStaticProps = async (context) => {
  return {
    props: {
      projects: await getProjects(),
    },
    revalidate: 60*60,
  }
}