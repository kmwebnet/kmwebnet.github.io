import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { withStyles, StyleRules } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'

export const styles = (theme: Theme): StyleRules => ({
  root: {
    height: 64,
    [theme.breakpoints.up('sm')]: {
      height: 70,
    },
  },
})

export default withStyles(styles)(Toolbar)
