import React, { useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame } from './lib'

import Play from './Play'
import Solution from './Solution'

const Game = () => {
  const [showSolution, setShowSolution] = useState(false)
  const gameId = useReactiveVar(memoryCurrentGame)

  if (!gameId) return null // helps v-spacing on Home

  return (
    <>
      <Solution showSolution={showSolution} />
      <Play showSolution={showSolution} setShowSolution={setShowSolution} />
    </>
  )
}

export default Game
