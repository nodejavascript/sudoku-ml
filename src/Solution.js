import React, { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import ReactGA from 'react-ga4'

import { memoryCurrentGame } from './lib'

import { returnGameFromStorage } from './logic'

import Board from './Board'

import { Card } from 'antd'
import Expand from 'react-expand-animated'

const Solution = ({ showSolution }) => {
  const gameId = useReactiveVar(memoryCurrentGame)

  useEffect(() => {
    const category = 'Game'
    const action = showSolution ? 'showSolution' : 'hideSolution'
    const label = gameId

    ReactGA.event({
      category,
      action,
      label
    })
  }, [showSolution])

  if (!gameId) return null

  const { solvedFormatted } = returnGameFromStorage(gameId)

  return (
    <Expand open={showSolution} easing='ease-in'>
      <Card
        type='inner'
        title='Solution'
      >
        <Board rows={solvedFormatted} />
      </Card>
    </Expand>
  )
}

export default Solution
