import React from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Typography from '../components/Typography'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    },
    container: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(7),
      display: 'flex',
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    desc: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      padding: theme.spacing(0, 5),
    },
    indt: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      textIndent: '4em',
      padding: theme.spacing(0, 5),
    },
    image: {
      height: 200,
      boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .5)',
    },
    title: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
  })

function ProductValues(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <div className={classes.item}>
              <Typography variant="h2" className={classes.title}>
                Feature & Benefit
              </Typography>
            </div>
            <div className={classes.desc}>
              <Typography variant="h5">
                {
                  '• Secure the entire development client, server, and device from the prototype stage with basic PKI technology.'
                }
              </Typography>
              <Typography variant="h5">
                {
                  '• This project enables following features on the well-known ESP32 platform.'
                }
              </Typography>
            </div>
            <div className={classes.indt}>
              <Typography variant="h5">{'1. Device boot control'}</Typography>
              <Typography variant="h5">
                {'2. Secure boot, flash encryption'}
              </Typography>
              <Typography variant="h5">
                {'3. TLS communication encryption with Hardware Root of Trust'}
              </Typography>
              <Typography variant="h5">{'4. OTA function'}</Typography>
              <Typography variant="h5">
                {'5. Wifi connection management'}
              </Typography>
            </div>
            <div className={classes.desc}>
              <Typography variant="h5">
                {'• Safely update firmware regardless of development platform'}
              </Typography>
              <Typography variant="h5">
                {'• Can be used openly, not just for specific services'}
              </Typography>
              <Typography variant="h5">
                {'• Supports secure device connection to AWS and Azure'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h6" className={classes.title} />
              <img className={classes.image} src="/arch.png" alt="proto" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default withStyles(styles)(ProductValues)
