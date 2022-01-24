import '../styles/globals.css'
import { useEffect } from 'react'
import HeadInfo from '../components/headInfo'
import Layout from '../components/layout/layout'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }){

  useEffect(()=> {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <>
    <SessionProvider session={session} refetchInterval={60*60}>
      <HeadInfo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
    </>
  )
}