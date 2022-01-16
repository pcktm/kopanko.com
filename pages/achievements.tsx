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
      action={item.action}
    ></Card>
  )
}

function MinorAchievement({item}: {item: Achievement}) {
  return <>
    <h5 className="title is-5">{item.title}</h5>
    <h6 className="subtitle is-6">{item.tagline}</h6>
    <span dangerouslySetInnerHTML={{__html: item.description?.html}} className="content"></span>
  </>
}

export default function Achievements({ achievements }: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const major = achievements.filter(a => !a.isMinor);
  const minor = achievements.filter(a => a.isMinor);
  
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
              {major.filter((p, i) => i % 2 === 0).map(achievement => {
                return <AchievementCard key={achievement.id} item={achievement} />
              })}
            </div>
            <div className="column">
              {major.filter((p, i) => i % 2 !== 0).map(achievement => {
                return <AchievementCard key={achievement.id} item={achievement} />
              })}
            </div>
          </div>

          <br></br>
          {minor.length > 0 && <h3 className="title is-3">Older achievements</h3>}
          {
            minor.map(achievement => {
              return <div key={achievement.id}>
                <MinorAchievement item={achievement}></MinorAchievement>
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
      achievements: await getAchievements(),
    },
    revalidate: 60*60,
  }
}