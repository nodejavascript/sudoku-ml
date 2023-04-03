import React from 'react'
import ReactGA from 'react-ga4'

import GraphqlClient from './GraphqlClient'
import Home from './Home'
import './App.css'

const { REACT_APP_MEASUREMENT_ID } = process.env

const App = () => {
  REACT_APP_MEASUREMENT_ID && ReactGA.initialize(REACT_APP_MEASUREMENT_ID)

  return (
    <GraphqlClient>

      <Home />

    </GraphqlClient>
  )
}

export default App
