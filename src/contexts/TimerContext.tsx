import { createContext, ReactNode, useState, useRef, useEffect, SetStateAction, Dispatch, MutableRefObject, useContext } from 'react'
import * as workerTimers from 'worker-timers'
import { ChallengesContext } from './ChallengesContext'

interface TimerContextData {
  hasFinished: boolean
  isActive: boolean
  startCountdown: () => void
  resetCountdown: (hasCompleted: boolean) => void
  isActive2: boolean
  time: number
  time2: MutableRefObject<number>
  setTime: Dispatch<SetStateAction<number>>
  initialTime3: MutableRefObject<number>
}

interface TimerProviderProps {
  children: ReactNode
}

// Context Code
export const TimerContext = createContext({} as TimerContextData)
//

const initialTime = 25 * 60

let initialTime2: Date

let intervalId: number

export function TimerContextProvider({ children }: TimerProviderProps) {
  const { startNewChallenge, resetChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const initialTime3 = useRef(initialTime)
  const isActive2 = useRef(false)
  let time2 = useRef(initialTime)
  const hasFinished = useRef(false)

  function myTimer() {
    setTime(Math.floor((new Date(initialTime2.getTime() + 1000 + initialTime3.current * 1000).getTime() - new Date().getTime()) / 1000))
    time2.current = Math.floor(
      (new Date(initialTime2.getTime() + 1000 + initialTime3.current * 1000).getTime() - new Date().getTime()) / 1000
    )
  }

  function myTimer3() {
    setTime(Math.floor((new Date().getTime() - new Date(initialTime2.getTime() + initialTime3.current * 1000).getTime()) / 1000))
    time2.current = Math.floor((new Date().getTime() - new Date(initialTime2.getTime() + initialTime3.current * 1000).getTime()) / 1000)
  }

  function myTimer2() {
    const minutes = Math.floor(time2.current / 60)
    const seconds = time2.current % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    document.title = `${minuteLeft}${minuteRight}:${secondLeft}${secondRight} - Chunk.It`
  }

  useEffect(() => {
    if (isActive2.current) {
      intervalId = workerTimers.setInterval(() => {
        if (isActive2.current && time2.current - 1 > 0 && !hasFinished.current) {
          myTimer()
          myTimer2()
        } else if (isActive2.current && time2.current - 1 < 1 && !hasFinished.current) {
          myTimer()
          myTimer2()

          hasFinished.current = true

          new Audio('/notification.mp3').play()

          if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
              body: 'Valendo 100 xp!'
            })
          }
        } else if (isActive2.current && hasFinished.current) {
          myTimer3()
          myTimer2()
        }
      }, 1000)
    }
  }, [isActive2.current])

  function startCountdown() {
    initialTime2 = new Date()
    new Audio('/notification.mp3').play()
    isActive2.current = true
    setIsActive(true)
    startNewChallenge()
  }

  function resetCountdown(hasCompleted: boolean) {
    workerTimers.clearInterval(intervalId)
    isActive2.current = false
    setIsActive(false)
    if (hasCompleted) {
      hasFinished.current = false
    }
    setTime(initialTime3.current)
    time2.current = initialTime3.current
    resetChallenge()
  }

  return (
    <TimerContext.Provider
      value={{
        hasFinished: hasFinished.current,
        isActive,
        startCountdown,
        resetCountdown,
        isActive2: isActive2.current,
        time,
        time2,
        setTime,
        initialTime3
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
