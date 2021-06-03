import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Card from '../components/elements/card'
import { getAchievements } from '../lib/cms'
import { Achievement } from '../lib/DTOs'

function AchievementCard({item}: {item: Achievement}) {
  return (
    <Card
      title={item.title}
      subtitle={item.tagline}
      imageUrl={item.coverImage?.url}
      content={item.description.html}
    ></Card>
  )
}

export default function Achievements({ achievements }: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const h1 = achievements.filter((p, i) => i % 2 === 0);
  const h2 = achievements.filter((p, i) => i % 2 !== 0);
  
  return (
    <div>
      <Head>
        <title>Achievements ● Jakub Kopańko</title>
        <meta name="description" content="My accomplishments and goals reached." />
      </Head>
      <div className="main section">
        <div className="container">
          <h1 className="title is-1 is-size-2-mobile">Achievements</h1>
          <h2 className="subtitle is-3">My accomplishments and goals reached.</h2>

          <br></br>

          <div className="columns is-multiline">
            <div className="column">
              {h1.map(achievement => {
                return <AchievementCard item={achievement} />
              })}
            </div>
            <div className="column">
              {h2.map(achievement => {
                return <AchievementCard item={achievement} />
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
      achievements: await getAchievements(),
    },
    revalidate: 60*60,
  }
}