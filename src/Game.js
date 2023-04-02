import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame } from './lib'

import Play from './Play'
import Solution from './Solution'

import { Space } from 'antd'

const Game = () => {
  const [showSolution, setShowSolution] = useState(false)

  const gameId = useReactiveVar(memoryCurrentGame)
  // helps spacing on Home
  if (!gameId) return null

  return (
    <Space align='top'>

      <Play showSolution={showSolution} setShowSolution={setShowSolution} />

      <Solution showSolution={showSolution} />

    </Space>
  )
}

export default Game
