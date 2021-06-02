import '../styles/globals.scss'
import Navbar from '../components/layout/navbar'
import Footer from '../components/layout/footer'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { init } from "@socialgouv/matomo-next"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    init({url: '//stats33.mydevil.net/', siteId: '115'})
  }, [])

  return <>
  <Head>
    <meta name="description" content="Full-stack developer, film director and editor." />
    <link rel="icon" type="image/png" href="/logo.png" />
    <link href="/assets/inter/inter.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
  </Head>

  <Navbar />

  <Component {...pageProps} />
  
  <Footer />
  </>
}

export default MyApp
