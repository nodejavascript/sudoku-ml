import React from 'react'
import Expand from 'react-expand-animated'

import { returnGameFromStorage } from './logic'

import Board from './Board'

import { Card } from 'antd'

const Solution = ({ gameId, showSolution }) => {
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
