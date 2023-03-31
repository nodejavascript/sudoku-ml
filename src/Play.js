import React from 'react'

import Board from './Board'
import NumberSelect from './NumberSelect'

import { Card, Button } from 'antd'

const Play = ({ game, showSolution, setShowSolution }) => {
  const { puzzleFormatted } = game

  const display = showSolution ? 'Hide solution' : 'Show solution'

  const extra = <Button size='small' onClick={() => setShowSolution(!showSolution)}>{display}</Button>

  return (
    <Card
      type='inner'
      title='Puzzle'
      extra={extra}
    >
      <Board rows={puzzleFormatted} heightOffset={5} />

      <NumberSelect showSolution={showSolution} setShowSolution={setShowSolution} />

    </Card>
  )
}

export default Play
