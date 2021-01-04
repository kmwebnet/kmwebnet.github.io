import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Typography from '../components/Typography'
import TextField from '../components/TextField'
import { Link as RouterLink } from 'react-router-dom'

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://github.com/kmwebnet">
        kmwebnet
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#ddffff',
  },
  container: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  iconsWrapper: {
    height: 60,
  },
  icons: {
    display: 'flex',
  },
  icon: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.warning.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
  list: {
    margin: 0,
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  language: {
    marginTop: theme.spacing(1),
    width: 150,
  },
}))

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'ja-JP',
    name: 'Japanese',
  },
]

export default function AppFooter() {
  const classes = useStyles()

  return (
    <Typography component="footer" className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justify="flex-end"
              className={classes.iconsWrapper}
              spacing={2}
            >
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <ul className={classes.list}>
              <li className={classes.listItem}>
                <Link component={RouterLink} to="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              size="medium"
              select
              SelectProps={{
                native: true,
              }}
              className={classes.language}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {
                'The manufacturer / product names listed are trademarks or registered trademarks of their respective companies.'
              }
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  )
}
