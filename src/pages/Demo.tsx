import withRoot from '../withRoot'

import React from 'react'
import AppAppBar from '../views/Appbar'
import DemoHero from '../views/DemoHero'
import DemoItems from '../views/DemoItems'
import DemoActions from '../views/DemoActions'
import AppFooter from '../views/AppFooter'

function Demo() {
  return (
    <div className="App">
      <header className="App-header">
        <AppAppBar />
        <DemoHero />
        <DemoItems />
        <DemoActions />
        <AppFooter />
      </header>
    </div>
  )
}

export default withRoot(Demo)
