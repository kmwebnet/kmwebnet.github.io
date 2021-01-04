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
      backgroundColor: '#ffe0ff',
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
    image: {
      height: 360,
      boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .5)',
    },
    title: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
  })

function ProductOss(props: WithStyles<typeof styles>) {
  const { classes } = props

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            <div className={classes.item}>
              <Typography variant="h2" className={classes.title}>
                open source
              </Typography>
            </div>
            <div className={classes.desc}>
              <Typography variant="h5">
                {
                  'For developers who are somewhat proficient in security, it is very important to know the exact security functions of rainbowtype.'
                }
              </Typography>
              <Typography variant="h5">
                {
                  'We believe it is important to be able to refer to the source code and customize it to meet your requirements.'
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img className={classes.image} src="/logo.png" alt="proto" />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default withStyles(styles)(ProductOss)
