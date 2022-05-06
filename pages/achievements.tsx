import {InferGetStaticPropsType} from 'next';
import Head from 'next/head';
import {getAchievements} from 'lib/cms';
import Card from 'components/elements/card';
import {Achievement} from 'lib/DTOs';

function AchievementCard({item}: {item: Achievement}) {
  return (
    <Card
      title={item.title}
      subtitle={item.tagline}
      image={item.coverImage}
      content={item.description?.html}
      action={item.action}
    />
  );
}

function MinorAchievement({item}: {item: Achievement}) {
  return (
    <>
      <h5 className="title is-5">{item.title}</h5>
      <h6 className="subtitle is-6">{item.tagline}</h6>
      { /* eslint-disable-next-line react/no-danger */ }
      <span dangerouslySetInnerHTML={{__html: item.description?.html ?? ''}} className="content" />
    </>
  );
}

export default function Achievements({achievements}: InferGetStaticPropsType<typeof getStaticProps>) {
  const major = achievements.filter((a) => !a.isMinor);
  const minor = achievements.filter((a) => a.isMinor);

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

          <br />

          <div className="columns is-multiline">
            <div className="column">
              {major.filter((p, i) => i % 2 === 0).map((achievement) => <AchievementCard key={achievement.id} item={achievement} />)}
            </div>
            <div className="column">
              {major.filter((p, i) => i % 2 !== 0).map((achievement) => <AchievementCard key={achievement.id} item={achievement} />)}
            </div>
          </div>

          <br />
          {minor.length > 0 && <h3 className="title is-3">Older achievements</h3>}
          {
            minor.map((achievement) => (
              <div key={achievement.id}>
                <MinorAchievement item={achievement} />
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
    achievements: await getAchievements(),
  },
  revalidate: 60 * 60,
});
