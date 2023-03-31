import React from 'react'
import Expand from 'react-expand-animated'

import Board from './Board'

import { Card } from 'antd'

const Solution = ({ showSolution, solvedFormatted }) => {
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
