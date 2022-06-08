import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
    <Head>
    <title>Poke fighter</title>
    <link rel="icon" href="https://www.pokepedia.fr/images/archive/7/75/20141106045821%21Dedenne-XY.png" />
    </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </div>
  )
}

export default MyApp
