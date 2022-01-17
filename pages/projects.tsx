import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/elements/card'
import { getProjects } from '../lib/cms'
import { Project } from '../lib/DTOs'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

function ProjectCard({project}: {project: Project}) {
  return (
    <Card
      title={project.title}
      subtitle={project.tagline}
      imageUrl={project.coverImage?.url}
      content={project.description.html}
      action={project.action}
    ></Card>
  )
}


function MinorProject({item}: {item: Project}) {
  return <>
    {item.action.url.length > 0 ?
      <a href={item.action.url} target="_blank">
        <span className="icon-text">
          <h5 className="title is-5" css={css`margin-bottom: 0px !important;`}>{item.title}</h5>
            <span className="icon">
              <i className="ri-external-link-line"></i>
            </span>
        </span>
      </a>
    : <h5 className="title is-5">{item.title}</h5>
    }
    <h6 className="subtitle is-6">{item.tagline}</h6>
    <span dangerouslySetInnerHTML={{__html: item.description?.html}} className="content"></span>
  </>
}

export default function Projects({ projects }: InferGetStaticPropsType<typeof getStaticProps>) {

  const major = projects.filter(a => !a.isMinor);
  const minor = projects.filter(a => a.isMinor);

  
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
              {major.filter((p, i) => i % 2 === 0).map(project => {
                return <ProjectCard key={project.id} project={project} />
              })}
            </div>
            <div className="column">
              {major.filter((p, i) => i % 2 !== 0).map(project => {
                return <ProjectCard key={project.id} project={project} />
              })}
            </div>
          </div>

          <br></br>
          {minor.length > 0 && <h3 className="title is-3">More projects</h3>}
          {
            minor.map(project => {
              return <div key={project.id}>
                <MinorProject item={project}></MinorProject>
                <hr></hr>
              </div>
            })
          }
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