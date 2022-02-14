import { createContext, ReactNode, useState } from 'react'
import challenges from '../lib/challenges.json'

interface ChallengesContextData {
  activeChallenge: ChallengeProps | null
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode
}

interface ChallengeProps {
  type: string
  description: string
  amount: number
}

// Context Code
export const ChallengesContext = createContext({} as ChallengesContextData)
//

export function ChallengesContextProvider({ children }: ChallengesProviderProps) {
  const [activeChallenge, setActiveChallenge] = useState<ChallengeProps | null>(null)

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    setActiveChallenge(null)
  }

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        startNewChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
