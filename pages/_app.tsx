import '../core/styles/tailwind.css'
import 'dayjs/locale/th'

import React, { useEffect, useContext } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import { AuthContext } from '../core/contexts/auth_context'
import theme from '../core/config/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { ModalBanner } from 'core/components/ModalBanner'
import { configure } from 'mobx'

configure({
  enforceActions: 'never'
})

function App({ Component, pageProps }) {
  const useStore = () => useContext(AuthContext)
  const authContext = useContext(AuthContext)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    authContext.fetchMe()
  }, [authContext])

  return (
    <>
      <Head>
        <title>
          SIT Career Center: ระบบบริหารความร่วมมือระหว่างคณะเทคโนโลยีสารสนเทศและอุตสาหกรรม
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <ModalBanner />
        <Component {...pageProps} authContext={useStore()} />
      </ThemeProvider>
    </>
  )
}

export default App
