import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = {
  heading: 'Outfit, sans-serif',
  body: 'Outfit, sans-serif',
  mono: '\'Menlo\', monospace'
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#00ff33',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      none: '0',
      sm: '0.375rem',
      base: '0.75rem',
      md: '0.75rem',
      lg: '0.9375rem',
      xl: '1.125rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '999px',
    },
  },
  colors: {
    black: '#16161D',
    teal: {
      50: '#FFF5F7',
      100: '#ffcce3',
      200: '#ff99c7',
      300: '#ff66aa',
      400: '#ff338e',
      500: '#ff0072',
      600: '#cc005b',
      700: '#990044',
      800: '#66002e',
      900: '#330017',
    },
  },
  shadows: {
    outline: '0 0 0 3px #ff00806a',
  },
  fonts,
  breakpoints,
})

export default theme
