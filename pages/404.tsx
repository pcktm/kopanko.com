import Head from 'next/head';
import styles from 'styles/errors.module.scss';

export default function Error404() {
  const quotes = [
    {
      quote: 'The first rule of meaningless acts of violence against the social fabric is to have fun.',
    },
    {
      quote: 'Be careful, lest in casting out your demon you exorcise the best thing in you.',
      author: 'Friedrich Nietzsche',
    },
    {
      quote: 'They were artists, without a doubt. And up to a point, they had starved for their art.',
      author: 'Harlan Ellison',
    },
    {
      quote: 'DEHUMANIZE YOURSELF AND FACE TO BLOODSHED. DEHUMANIZE YOURSELF AND FACE TO BLOODSHED.',
    },
    {
      quote: 'Outwardly: dumbly, I shamble about, a thing that could never have been known as human...',
      author: 'Harlan Ellison',
    },
    {
      quote: 'Inwardly: alone. Here. Living under the land, under the sea, in the belly of AM, whom we created...',
      author: 'Harlan Ellison',
    },
    {
      quote: 'Keep your head above the water \\ Drowning in you',
      author: 'Palace',
    },
    {
      quote: "I don't know where I'll be tomorrow \\ And I feel free \\ Just to be me",
      author: 'Skinshape',
    },
    {
      quote: "Cause now I know that all plans fade away \\ And so I'm only planning for today",
      author: 'Lewis Del Mar',
    },
  ];
  const chosenQuote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <>
      <Head>
        <title>404: This page could not be found</title>
      </Head>
      <section className="main section" style={{padding: '11rem 2rem', minHeight: '70vh'}}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-three-fifths">

              <p className="title is-5 has-text-weight-light">
                404: This page could not be found.
              </p>

              <div className={`is-clearfix ${styles.quoteBox}`}>
                <hr />
                <p className="title is-3 has-text-weight-bold is-italic">
                  {chosenQuote.author && '“'}
                  {chosenQuote.quote}
                  {chosenQuote.author && '”'}
                </p>
                <p className="subtitle is-pulled-right">
                  {chosenQuote.author && `— ${chosenQuote.author}`}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
