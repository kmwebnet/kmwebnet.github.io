import withRoot from '../withRoot'

import React from 'react'
import AppAppBar from '../views/Appbar'
import ProductHero from '../views/ProductHero'
import ProductValues from '../views/ProductValues'
import ProductFeatures from '../views/ProductFeatures'
import ProductOss from '../views/ProductOss'
import ProductActions from '../views/ProductActions'
import AppFooter from '../views/AppFooter'

function Index() {
  return (
    <div className="App">
      <header className="App-header">
        <AppAppBar />
        <ProductHero />
        <ProductValues />
        <ProductFeatures />
        <ProductOss />
        <ProductActions />
        <AppFooter />
      </header>
    </div>
  )
}

export default withRoot(Index)
