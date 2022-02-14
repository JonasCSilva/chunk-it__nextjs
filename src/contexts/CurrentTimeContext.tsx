import { createContext, ReactNode, useState, useRef, useEffect, MutableRefObject } from 'react'
import * as workerTimers from 'worker-timers'

interface CurrentTimeContextData {
  currentTime: string
  currentTime2: MutableRefObject<string>
}

interface CurrentTimeProviderProps {
  children: ReactNode
}

// Context Code
export const CurrentTimeContext = createContext({} as CurrentTimeContextData)
//

const options: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
}

export function CurrentTimeContextProvider({ children }: CurrentTimeProviderProps) {
  const [currentTime, setCurrentTime] = useState('99:99:99 PM')
  const currentTime2 = useRef('11:59:59 PM')

  useEffect(() => {
    const intervalId = workerTimers.setInterval(() => {
      const test = new Date(new Date().getTime()).toLocaleTimeString('en-US', options)
      currentTime2.current = test
      setCurrentTime(test)
    }, 500)
  }, [])

  return (
    <CurrentTimeContext.Provider
      value={{
        currentTime,
        currentTime2: currentTime2
      }}
    >
      {children}
    </CurrentTimeContext.Provider>
  )
}
