import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#295B8D'
    },
    secondary: {
      main: '#168FBD'
    },
    error: {
      main: '#EB5757'
    },
    background: {
      default: '#fff'
    }
  }
})

export default theme