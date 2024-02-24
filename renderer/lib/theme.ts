import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    // as stand-in for white coor
    warning: {
      main: 'rgb(255, 255, 255)',
    },
  },
})

export default theme
