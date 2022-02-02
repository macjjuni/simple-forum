import '../styles/globals.css'
import { PostContext } from '../context/PostContext' 
import { useEffect, useState } from 'react'
import HeadInfo from '../components/headInfo'
import Layout from '../components/layout/layout'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }){

  const [List, setList] = useState([]);

  useEffect(()=> {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) && isDark === true) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <>
    <SessionProvider session={session} refetchInterval={60*60}>
      <HeadInfo />
          <Layout>
            <PostContext.Provider value={{ List, setList }}>
              <Component {...pageProps} />
            </PostContext.Provider>
          </Layout>
    </SessionProvider>
    </>
  )
}