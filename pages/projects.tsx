import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/elements/card'


export default function Projects() {
  return (
    <div>
      <Head>
        <title>Projects ● Jakub Kopańko</title>
      </Head>
      <div className="main section">
        <div className="container">
          <h1 className="title is-1 is-size-2-mobile">Projects</h1>
          <h2 className="subtitle is-3">My personal projects and ventures.</h2>

          <br></br>

          <div className="columns is-multiline">
            <div className="column">
              <Card
                title="Chief Coordinator"
                subtitle="Zwierciadła Theatre Festival, Lublin"
                imageUrl="/images/projects/zwierciadla.jpg"
              >
                <>
                I was the chief coordinator of the XVI Lublin Theatre Meetings „Zwierciadła” - the biggest and most recognizable youth theatre festival in Poland. <br></br>
                • I've successfully led and managed a team of over 150 volunteers.<br></br>
                • I've dealt with multiple sponsors and business partners.<br></br>
                • I oversaw the creation of social media, press and print material.<br></br>
                The edition led by me was a show-stopper and attracted an audience of over 1000 spectators.
                </>
              </Card>
              <Card
                title="Member of the Committee for Digitization"
                subtitle="Uczelniana Rada Samorządu Studentów AGH"
                imageUrl="/images/projects/urss.jpg"
              >
                <>
                • I am solving the current problems of university Students' Council using modern technologies including React, Koa, Electron, TypeScript and PostrgreSQL.<br></br>
                • I've implemented solutions used by the whole university community including an advanced customer relationship management system.
                </>
              </Card>
            </div>
            <div className="column">
              <Card
                title="There goes a man"
                subtitle="Short film (13 minutes), 2019"
                imageUrl="/images/projects/idzieczlowiek2.jpg"
              >
                <>
                Military Organization FAR aims to create and train an artificial intelligence that develops free will.
                I was the editor and co-director. While editing this film, I proved my skills of surgical datamoshing.
                </>
              </Card>
              <Card
                title="Dulce et decorum est pro patria mori"
                subtitle="Short film (5 minutes), 2017"
                imageUrl="/images/projects/dede.jpg"
              >
                <>
                Year 202X. Each country of the new world is obliged to present one dance floor. The winning nation will become the leader of the Union of States of the New World.
                </>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
