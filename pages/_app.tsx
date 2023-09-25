import '../styles/globals.scss';
import 'remixicon/fonts/remixicon.css';
import React, {useEffect} from 'react';
import Head from 'next/head';
import {SWRConfig} from 'swr';
import axios from 'axios';
import {AppProps} from 'next/app';
import {Provider} from 'react-wrap-balancer';
import Footer from '../components/layout/footer';
import Navbar from '../components/layout/navbar';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="Full-stack developer, film director and editor." />
        <link rel="icon" type="image/png" href="/logo.png" />
        { /* eslint-disable-next-line @next/next/no-css-tags */ }
        <link href="/assets/inter/inter.css" rel="stylesheet" />
        <meta property="og:image" key="ogimage" content="https://kopanko.com/images/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pcktm_" />
        <meta name="twitter:creator" content="@pcktm_" />
        {typeof window !== 'undefined' && <script defer data-domain="kopanko.com" src="https://analytics.kopanko.com/js/script.js" />}
      </Head>

      <SWRConfig
        value={{
          fetcher: (resource) => axios.get(resource).then((res) => res.data),
        }}
      >
        <Navbar />
        <Provider>
          <Component {...pageProps} />
        </Provider>
        <Footer />
      </SWRConfig>
    </>
  );
}

export default MyApp;
