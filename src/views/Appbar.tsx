import React from 'react'
import clsx from 'clsx'
import { Theme, withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import AppBar from '../components/Appbar'
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar'
import { AppBarProps, WithStyles } from '@material-ui/core'
import logo from '../images/logo.png'
import { Link as RouterLink } from 'react-router-dom'

const styles = (theme: Theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
    boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .5)',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
})

function AppAppBar(props: WithStyles<typeof styles> & AppBarProps) {
  const { classes } = props

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="logo" height="69" width="77" />
          <div className={classes.left} />
          <div className={classes.right}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              component={RouterLink}
              to="/"
            >
              {'home'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              component={RouterLink}
              to="/getstarted"
            >
              {'Get Started'}
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  )
}

export default withStyles(styles)(AppAppBar)
