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
      backgroundColor: '#ffffdd',
    },
    container: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(8),
      display: 'flex',
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    image: {
      height: 240,
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
                Concept
              </Typography>
              <Typography variant="h5">
                {
                  'In today’s IoT project, prototyping and field deployment are inextricably linked.'
                }
              </Typography>
              <Typography variant="h5">
                {
                  'Like the CI / CD development cycle, they create more value by being repeated.'
                }
              </Typography>
              <Typography variant="h5">
                {
                  'The range of IoT ranges from edge devices to the cloud, and it may be almost impossible to incorporate security measures in the middle of the project.'
                }
              </Typography>
              <Typography variant="h5">
                {
                  'This project provides the system footprint that developers need for security measures from the time its prototype.'
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Typography variant="h6" className={classes.title} />
              <img
                className={classes.image}
                src="/harrison-broadbent-afZVP8xbbw0-unsplash.jpg"
                alt="proto"
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default withStyles(styles)(ProductValues)
