import Head from 'next/head';

export default function Error404() {
  return (
    <>
      <Head>
        <title>404: This page could not be found</title>
      </Head>
      <section className="main section" style={{paddingTop: 0, minHeight: '70vh'}}>
        <div className="container">
          <section className="hero is-large">
            <div className="hero-body has-text-centered">
              <p className="title is-1 has-text-weight-bold">
                Uh oh?
              </p>
              <p className="subtitle">
                This page could not be found.
              </p>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
