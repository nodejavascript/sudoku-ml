import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { dateFormatted } from './lib'
import { updateGameToStorage, returnGameFromStorage, returnGameProgress } from './logic'

import Board from './Board'
import NumberSelect from './NumberSelect'
import ShowSolutionButton from './ShowSolutionButton'

import { Card, Progress, message, Alert } from 'antd'
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

const Play = ({ gameId, showSolution, setShowSolution }) => {
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

  if (!game) return <Alert message='Load or create a new game' banner />

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
      type='inner'
      title={dateFormatted(createdAt)}
      extra={<ShowSolutionButton showSolution={showSolution} setShowSolution={setShowSolution} />}
    >

      <Progress
        percent={percent}
        type={progressType}
        status='active'
        strokeColor={{
          from: blue[4],
          to: purple[4]
        }}
        style={{ margin: 5, marginBottom: 20 }}
      />

      <Board rows={puzzleFormatted} heightOffset={15} cellClick={cellClick} />

      <NumberSelect />

    </Card>
  )
}

export default Play
