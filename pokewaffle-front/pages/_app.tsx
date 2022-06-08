import '../styles/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
    <Head>
    <title>Poke fighter</title>
    <link rel="icon" href="dedenne.png" />
    </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </div>
  )
}

export default MyApp
