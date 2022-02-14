import { useColorModeValue } from '@chakra-ui/react'
import { createContext, ReactNode } from 'react'

interface ColorsContextData {
  bgColor: string
  hoverBgColor: string
}

// Context Code
export const ColorsContext = createContext({} as ColorsContextData)
//

export function ColorsContextProvider({ children }: { children: ReactNode }) {
  const bgColor = useColorModeValue('gray.50', 'whiteAlpha.300')
  const hoverBgColor = useColorModeValue('gray.200', 'whiteAlpha.500')

  return (
    <ColorsContext.Provider
      value={{
        bgColor,
        hoverBgColor
      }}
    >
      {children}
    </ColorsContext.Provider>
  )
}
