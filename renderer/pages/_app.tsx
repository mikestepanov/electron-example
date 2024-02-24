import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'jotai'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { io } from 'socket.io-client'

import { SocketContext } from 'contexts/socketContext'

// 3 dots css animation from https://codepen.io/nzbin/pen/GGrXbp
import 'lib/3dots.css'
import createEmotionCache from 'lib/create-emotion-cache'
import theme from 'lib/theme'

const clientSideEmotionCache = createEmotionCache()

type MyAppProps = AppProps & {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props

  // Establish a socket connection with the server
  // server/index.ts
  const socket = io('ws://localhost:3333')

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SocketContext.Provider value={socket}>
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </SocketContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}
