import React, { useEffect, useState } from 'react'
import { gql, useMutation, useReactiveVar } from '@apollo/client'

import { memoryCurrentGame } from './lib'
import { updateGameToStorage, returnGameFromStorage, returnGameProgress } from './logic'

import Board from './Board'
import NumberSelect from './NumberSelect'
import ShowSolutionButton from './ShowSolutionButton'

import { blue, purple } from '@ant-design/colors'

import { Card, Progress, message, Space, Typography } from 'antd'

const { Title } = Typography

const MUTATION_CHECK_SUDOKU = gql`
  mutation mutationCheckSudoku ($checkSudokuInput: CheckSudokuInput) {
    checkSudoku (checkSudokuInput: $checkSudokuInput ) {
      correct
      userSubmitted
      puzzleFormatted {
        key
        index
        column
        row
        square
        display
      }
      puzzle
    }
  }
`

const Play = ({ showSolution, setShowSolution }) => {
  const gameId = useReactiveVar(memoryCurrentGame)
  const [mutationCheckSudoku, { error, data }] = useMutation(MUTATION_CHECK_SUDOKU)

  const [game, setGame] = useState()

  useEffect(() => {
    if (gameId) {
      setGame(returnGameFromStorage(gameId))
    }
  }, [gameId, setGame])

  useEffect(() => {
    if (!game) return

    const { puzzle } = game

    mutationCheckSudoku({
      variables: {
        checkSudokuInput: {
          puzzle,
          userSubmitted: false
        }
      }
    })
  }, [game, mutationCheckSudoku])

  useEffect(() => {
    if (!data?.checkSudoku) return

    const { userSubmitted, correct, puzzle, puzzleFormatted } = data.checkSudoku

    if (userSubmitted) {
      if (!correct) message.error('Incorrect')
      if (correct) message.success('Correct')
    }

    if (userSubmitted && correct) {
      updateGameToStorage(gameId, puzzle, puzzleFormatted)
      setGame(returnGameFromStorage(gameId))
    }
  }, [gameId, data, setGame])

  useEffect(() => {
    if (error) console.log('mutationCheckSudoku', error)
  }, [error])

  if (!game) return null

  const cellClick = (cell, buttonSelected) => {
    if (!buttonSelected) return

    const { puzzle } = game
    const { index } = cell

    const value = buttonSelected - 1

    const submit = [...puzzle]
    submit[index] = value

    return mutationCheckSudoku({
      variables: {
        checkSudokuInput: {
          puzzle: submit,
          userSubmitted: true
        }
      }
    })
  }

  const { puzzleFormatted } = game
  const { percent, progressType } = returnGameProgress(game)

  return (
    <Card
      title={<Title level={4} style={{ margin: 0, color: blue[5] }}>{gameId}</Title>}
      extra={<ShowSolutionButton showSolution={showSolution} setShowSolution={setShowSolution} />}
    >

      <Space
        direction='vertical'
      >

        <Progress
          percent={percent}
          type={progressType}
          status='active'
          strokeColor={{
            from: blue[5],
            to: purple[4]
          }}
        />

        <NumberSelect />

        <Board rows={puzzleFormatted} heightOffset={15} cellClick={cellClick} />

      </Space>

    </Card>
  )
}

export default Play
