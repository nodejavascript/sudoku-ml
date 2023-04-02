import React from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame } from './lib'

import { returnGameFromStorage } from './logic'

import Board from './Board'

import { Card } from 'antd'
import Expand from 'react-expand-animated'

const Solution = ({ showSolution }) => {
  const gameId = useReactiveVar(memoryCurrentGame)
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
