import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame } from './lib'
import { returnGameFromStorage } from './logic'

import Play from './Play'
import Solution from './Solution'

import { Space, Alert } from 'antd'

const Game = () => {
  const [showSolution, setShowSolution] = useState(false)
  const gameId = useReactiveVar(memoryCurrentGame)
  const game = returnGameFromStorage(gameId)

  if (!game) return <Alert message='Load or create a new game' banner />

  return (
    <Space
      align='top'
    >
      <Play game={game} showSolution={showSolution} setShowSolution={setShowSolution} />
      <Solution showSolution={showSolution} solvedFormatted={game.solvedFormatted} />

    </Space>
  )
}

export default Game
