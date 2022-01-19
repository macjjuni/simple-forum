import '../styles/globals.css'
import HeadInfo from '../components/headInfo'
import Layout from '../components/layout/layout'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }){


  return (
    <SessionProvider session={session} refetchInterval={60*60}>
      <HeadInfo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}