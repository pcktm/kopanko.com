import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/elements/card'

export default function Achievements() {
  return (
    <div>
      <Head>
        <title>Achievements ● Jakub Kopańko</title>
      </Head>
      <div className="main section">
        <div className="container">
          <h1 className="title is-1 is-size-2-mobile">Achievements</h1>
          <h2 className="subtitle is-3">My accomplishments and goals reached.</h2>

          <br></br>

          <div className="columns is-multiline">
            <div className="column">

              <Card
                title="Finalist in Education category"
                subtitle="HackYeah 2018, Warsaw"
                imageUrl="/images/achievements/joint.jpg"
                description="My friend and I competed in HackYeah - the biggest stationary hackathon in Europe. We earned our spot as the finalists under the education category. We built a Physics engine for teachers to use in their classrooms."
              />

              <Card
                title="2nd Place Winner"
                subtitle="BITEhack 2021, Kraków"
                imageUrl="/images/achievements/keyanu.jpg"
                description="I lead a team of student developers and in under 24 hours we developed a fully working manager and keyboard shortcut executor for a smarter workplace and people with increased needs."
              />
            
            </div>
            <div className="column">

              <Card
                title="1st Place Winner for Best Gameplay"
                subtitle="Grarantanna Game Jam 2020"
                imageUrl="/images/achievements/brawlbox.png"
                description="My friend and I took advantage of the social distancing free time and placed 1st for best gameplay in the Grarantanna Game Jam hosted by the Ministry of Digital Affairs in Poland."
              />
              
              <Card
                title="Finalist in partner task"
                subtitle="HackYeah 2020, Warsaw"
                imageUrl="/images/achievements/boarinc.jpg"
                description="My friend and I developed a sophisticated solution to track wild boar sightings along with advanced spatial analysis tools."
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
