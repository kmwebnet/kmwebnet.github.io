import React from 'react'
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Container from '@material-ui/core/Container'
import Typography from '../components/Typography'
import { Link as RouterLink } from 'react-router-dom'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
    },
    images: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexWrap: 'wrap',
    },
    imageWrapper: {
      position: 'relative',
      display: 'block',
      padding: 0,
      borderRadius: 0,
      height: '40vh',
      [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
      },
      '&:hover': {
        zIndex: 1,
      },
      '&:hover $imageBackdrop': {
        opacity: 0.15,
      },
      '&:hover $imageMarked': {
        opacity: 0,
      },
      '&:hover $imageTitle': {
        border: '4px solid currentColor',
      },
    },
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: theme.palette.common.black,
      opacity: 0.5,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      background: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  })

function DemoItems(props: WithStyles<typeof styles>) {
  const { classes } = props

  const images = [
    {
      url: '/bg-term.jpg',
      title: 'REMOTE SERIAL CONSOLE',
      width: '33%',
      link: '/demoterm',
    },
    {
      url: '/bg-cam.jpg',
      title: 'Surveillance camera',
      width: '33%',
      link: '/democam',
    },
    {
      url: '/bg-cloud.jpg',
      title: 'connection to AWS',
      width: '33%',
      link: '/demoaws',
    },
  ]

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Demo Items
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
            component={RouterLink}
            to={`${image.link}`}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  )
}

export default withStyles(styles)(DemoItems)
