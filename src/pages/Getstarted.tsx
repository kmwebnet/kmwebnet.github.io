import withRoot from '../withRoot'
// --- Post bootstrap -----
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Markdown from '../components/Markdown'
import Typography from '../components/Typography'
import AppAppBar from '../views/Appbar'
import AppFooter from '../views/AppFooter'
import DemoItems from '../views/DemoItems'

function Getstarted() {
  const [markdown, setMarkdown] = useState('')

  // https://github.com/webpack/webpack/issues/6680
  useEffect(() => {
    import('../views/Getstarted.md')
      .then((content) => fetch(content.default))
      .then((response) => response.text())
      .then((responseText) => setMarkdown(responseText))
  })

  if (!markdown) {
    return <div />
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box mt={7} mb={12}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            rainbowtype get started
          </Typography>
          <Markdown>{markdown}</Markdown>
        </Box>
      </Container>
      <DemoItems />
      <AppFooter />
    </React.Fragment>
  )
}

export default withRoot(Getstarted)
