import React from 'react'
import {
  WithStyles,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles'
import Button from '../components/Button'
import Typography from '../components/Typography'
import ProductHeroLayout from './ProductHeroLayout'
import { Link as RouterLink } from 'react-router-dom'

const backgroundImage = 'esp32.jpg'

const styles = (theme: Theme) =>
  createStyles({
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: '#404040', // Average color of the background image.
      backgroundPosition: 'center',
    },
    button: {
      minWidth: 200,
    },
    h5: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
      },
    },
    more: {
      marginTop: theme.spacing(2),
    },
  })

function ProductHero(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2">
        Secure IoT development
      </Typography>
      <Typography color="inherit" align="center" variant="h2">
        from the prototype stage
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Open source secure IoT prototyping system for ESP32
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={RouterLink}
        to="/getstarted"
      >
        Get started
      </Button>
      <Button
        color="primary"
        variant="contained"
        size="large"
        className={classes.button}
        component={RouterLink}
        to="/demo"
      >
        Demo showcase
      </Button>
    </ProductHeroLayout>
  )
}

export default withStyles(styles)(ProductHero)
