import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/index.module.scss';
import RainbowCanvas from '../components/elements/rainbowCanvas';

function Box({
  title, subtitle, href, gradient,
}: {title: string, subtitle: string, href: string, gradient?: string}) {
  return (
    <div className="column">
      <Link href={href}>
        <div className={`${styles.borderGradient} is-clickable`} style={{background: gradient}}>
          <div className="box hover-shadow">
            <h4 className="title is-4">{title}</h4>
            <h6 className="subtitle is-6">{subtitle}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
}

Box.defaultProps = {
  gradient: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
};

export default function Home() {
  const account = 'hi'; const
    domain = 'kopanko';
  function handleMail(event: any) {
    window.location.href = `mailto:${account}@${domain}.com`;
    return false;
  }

  return (
    <div>
      <Head>
        <title>Jakub Kopańko</title>
      </Head>

      <div className={`main section ${styles.withGradient}`}>
        <section className="content intro">
          <div className={`container ${styles.coloredContainer}`}>
            <RainbowCanvas className={styles.rainbowCanvas} />
            <div
              className={`${styles.about} ${styles.gradient}`}
              style={{userSelect: 'none'}}
            >
              <p className={`title ${styles.title}`}>
                Jakub Kopańko, a full-stack developer
                <br />
                and a great buddy.
              </p>
              <p className={`subtitle ${styles.subtitle}`}>
                In love with open source, filmmaking and breaking stuff.
              </p>
            </div>
          </div>

        </section>

        <div className="container" style={{marginBottom: '90px'}}>
          <div className="columns">
            <Box
              href="/notes"
              title="Notes"
              subtitle="Random lighthearted things and some advanced datamoshing guides."
            />
            <Box
              href="/projects"
              title="Projects"
              subtitle="My personal projects and various adventures. Both successful and less so."
              gradient="linear-gradient(62deg, #FAACA8 0%, #DDD6F3 100%)"
            />
            <Box
              href="/achievements"
              title="Achievements"
              subtitle="My own accomplishments and various awards that I am proud of."
              gradient="linear-gradient(90deg, #74ebd5, #acb6e5)"
            />
          </div>
        </div>

        <div className="container">
          <h4 className="title is-3">Get in touch</h4>
          <span className="icon-text">
            <span className="icon">
              <i className="ri-mail-line" />
            </span>
            {/* eslint-disable-next-line */}
            <span
              className={`${styles.mail} is-clickable`}
              data-a={account}
              data-d={domain}
              onClick={handleMail}
            />
          </span>
          <br />
          <span className="icon-text">
            <span className="icon">
              <i className="ri-key-2-line" />
            </span>
            <a href="/assets/0x5B241D4445E1847B-pub.asc">
              My public key
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
