import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame } from './lib'

import Play from './Play'
import Solution from './Solution'

import { Space } from 'antd'

const Game = () => {
  const [showSolution, setShowSolution] = useState(false)
  const gameId = useReactiveVar(memoryCurrentGame)

  if (!gameId) return null // helps v-spacing on Home

  return (
    <Space
      direction='vertical'
      style={{ display: 'flex' }}
    >
      <Solution showSolution={showSolution} setShowSolution={setShowSolution} />
      <Play showSolution={showSolution} setShowSolution={setShowSolution} />
    </Space>
  )
}

export default Game
