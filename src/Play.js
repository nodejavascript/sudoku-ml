import React, { useEffect, useState } from 'react'
import { gql, useMutation, useReactiveVar } from '@apollo/client'

import { friendlyDateFormat, memoryCurrentGame } from './lib'
import { updateGameToStorage, returnGameFromStorage, returnGameProgress } from './logic'

import Board from './Board'
import NumberSelect from './NumberSelect'
import ShowSolutionButton from './ShowSolutionButton'

import { Card, Progress, message, Space } from 'antd'
import { blue, purple } from '@ant-design/colors'

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
  }, [game])

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

  const { puzzleFormatted, createdAt } = game
  const { percent, progressType } = returnGameProgress(game)

  return (
    <Card
      title={friendlyDateFormat(createdAt)}
      extra={<ShowSolutionButton showSolution={showSolution} setShowSolution={setShowSolution} />}
      style={{ textAlign: 'center' }}
    >

      <Space
        direction='vertical'
      >

        <Progress
          percent={percent}
          type={progressType}
          status='active'
          strokeColor={{
            from: blue[4],
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
