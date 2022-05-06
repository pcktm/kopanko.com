import '../styles/globals.scss';
import 'remixicon/fonts/remixicon.css';
import React, {useEffect} from 'react';
import Head from 'next/head';
import {init} from '@socialgouv/matomo-next';
import {SWRConfig} from 'swr';
import axios from 'axios';
import {AppProps} from 'next/app';
import Footer from '../components/layout/footer';
import Navbar from '../components/layout/navbar';

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') init({url: '//stats33.mydevil.net/', siteId: '120'});
  }, []);

  return (
    <>
      <Head>
        <meta name="description" content="Full-stack developer, film director and editor." />
        <link rel="icon" type="image/png" href="/logo.png" />
        { /* eslint-disable-next-line @next/next/no-css-tags */ }
        <link href="/assets/inter/inter.css" rel="stylesheet" />
        <meta property="og:image" content="https://kopanko.com/images/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pcktm_" />
        <meta name="twitter:creator" content="@pcktm_" />
      </Head>

      <SWRConfig
        value={{
          fetcher: (resource) => axios.get(resource).then((res) => res.data),
        }}
      >
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SWRConfig>
    </>
  );
}

export default MyApp;
