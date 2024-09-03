import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: '#FEFCFF'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#1C0E06',
      light: '#FEFCFF'
    },
    secondary: {
      main: '#FEFCFF'
    },
    info: {
      main: '#084887'
    }
  }
})

export default theme
