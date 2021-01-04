import React from 'react'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles'
import Typography from '../components/Typography'
import { Link as RouterLink } from 'react-router-dom'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(9),
      marginBottom: theme.spacing(9),
    },
    button: {
      border: '4px solid currentColor',
      borderRadius: 0,
      height: 'auto',
      padding: theme.spacing(2, 5),
    },
    link: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  })

function DemoActions(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <Container className={classes.root} component="section">
      <Button className={classes.button}>
        <Typography variant="h4" component={RouterLink} to="/getstarted">
          GET STARTED
        </Typography>
      </Button>
    </Container>
  )
}

export default withStyles(styles)(DemoActions)
