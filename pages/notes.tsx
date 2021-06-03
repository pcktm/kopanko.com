import { gql } from 'graphql-request'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {getNotes} from '../lib/cms'
import { Note } from '../lib/DTOs'

export default function Notes() {
  return (
    <div>
      <Head>
        <title>Notes ● Jakub Kopańko</title>
        <meta name="description" content="Random lighthearted things and some advanced datamoshing guides." />
      </Head>
      <div className="main section">
        <div className="container">
          <h1 className="title is-1 is-size-2-mobile">
            Notes
          </h1>
          <h2 className="subtitle is-3">No notes here, yet.</h2>
        </div>
      </div>
    </div>
  )
}

// export const getStaticProps = async (context) => {
//   return {
//     props: {
//       notes: await getNotes(),
//     }
//   }
// }
