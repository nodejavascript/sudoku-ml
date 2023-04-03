import React, { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import ReactGA from 'react-ga4'

import { memoryCurrentGame } from './lib'

import { returnGameFromStorage } from './logic'

import Board from './Board'

import { Card, Modal } from 'antd'
import Expand from 'react-expand-animated'

const Solution = ({ showSolution, setShowSolution }) => {
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
    <Modal
      style={{ top: 1 }}
      title='Cheater!'
      open={showSolution}
      onCancel={() => setShowSolution(false)}
      footer={null}
    >
      <Board key={`solution_${gameId}`} rows={solvedFormatted} />
    </Modal>
  )
}

export default Solution
