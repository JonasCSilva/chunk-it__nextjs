import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import myTheme from '../styles/theme'
import { ColorsContextProvider } from '../contexts/ColorsContext'
import { TimerContextProvider } from '../contexts/TimerContext'
import { CurrentTimeContextProvider } from '../contexts/CurrentTimeContext'
import { ChallengesContextProvider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={myTheme}>
      <CurrentTimeContextProvider>
        <ChallengesContextProvider>
          <TimerContextProvider>
            <ColorsContextProvider>
              <Component {...pageProps} />
            </ColorsContextProvider>
          </TimerContextProvider>
        </ChallengesContextProvider>
      </CurrentTimeContextProvider>
    </ChakraProvider>
  )
}

export default MyApp
