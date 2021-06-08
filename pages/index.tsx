/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

function Box({title, subtitle, href}: {title: string, subtitle: string, href: string}) {
  return (
  <div className="column">
    <Link href={href}>
      <a>
        <div className="box hover-shadow">
          <h4 className="title is-4">{title}</h4>
          <h6 className="subtitle is-6">{subtitle}</h6>
        </div>
      </a>
    </Link>
  </div>
  )
}

export default function Home() {
  const account = 'hi', domain = 'kopanko';
  function handleMail(event: any) {
    window.location.href = 'mailto:' + account + '@' + domain + '.com';
    return false;
  }

  return (
    <div>
      <Head>
        <title>Jakub Kopańko</title>
      </Head>

      <div className="main section with-gradient">
        <section className="content intro">
          <div className="container">
            <div className="about gradient">
              <p className="title ">Jakub Kopańko, a full-stack developer<br/>and a great buddy.</p>
              <p className="subtitle">In love with open source, filmmaking and breaking stuff.</p>
            </div>
          </div>
        </section>

        <div className="container" css={css`margin-bottom: 90px`}>
          <div className="columns">
            <Box href="/notes" title="Notes" subtitle="Random lighthearted things and some advanced datamoshing guides."/>
            <Box href="/projects" title="Projects" subtitle="My personal projects and various adventures. Both successful and less so."/>
            <Box href="/achievements" title="Achievements" subtitle="My own accomplishments and various awards that I am proud of."/>
          </div>
        </div>
          
        <div className="container">
          <h4 className="title is-3">Get in touch</h4>
          <span className="icon-text">
            <span className="icon">
              <i className="ri-mail-line"/>
            </span>
            <a
            className="mail"
            data-a={account}
            data-d={domain}
            onClick={handleMail}
            />
          </span>
          <br/>
        </div>
      </div>
    </div>
  )
}
