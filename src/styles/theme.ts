import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = {
  styles: {
    global: () => ({
      'html, body': {
        padding: 0,
        fontFamily: 'Inter'
      },
      '*': {
        boxSizing: 'border-box'
      }
    })
  },
  ...config
}

const myTheme = extendTheme(theme)

export default myTheme
