import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { dateFormatted } from './lib'
import { updateGameToStorage } from './logic'

import Board from './Board'
import NumberSelect from './NumberSelect'
import ShowSolutionButton from './ShowSolutionButton'

import { Card, Progress, message } from 'antd'
import { blue, purple } from '@ant-design/colors'

const MUTATION_CHECK_SUDOKU = gql`
  mutation mutationCheckSudoku ($checkSudokuInput: CheckSudokuInput) {
    checkSudoku (checkSudokuInput: $checkSudokuInput ) {
      correct
      completed
      percent
      solved
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

const Play = ({ game, showSolution, setShowSolution, reloadGame }) => {
  const [mutationCheckSudoku, { error, data }] = useMutation(MUTATION_CHECK_SUDOKU)
  const [percent, setPercent] = useState()

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
  }, [mutationCheckSudoku, game])

  useEffect(() => {
    if (!game) return
    if (!data?.checkSudoku) return

    const { correct, solved, userSubmitted, percent, puzzle, puzzleFormatted } = data.checkSudoku

    if (userSubmitted && !correct) message.error('Incorrect')

    if (userSubmitted && correct) {
      message.success('Correct!')
      updateGameToStorage(game.gameId, puzzle, puzzleFormatted)
      reloadGame()
    }

    if (userSubmitted && solved) message.success('Solved!')

    percent && setPercent(percent)
  }, [data, setPercent, game, reloadGame])

  useEffect(() => {
    if (error) console.log('mutationCheckSudoku', error)
  }, [error])

  const { puzzleFormatted, createdAt } = game

  const cellClick = (cell, buttonSelected) => {
    if (!buttonSelected) return

    const { puzzle } = game
    const { index } = cell

    const value = buttonSelected - 1

    const submit = [...puzzle]
    submit[index] = value

    mutationCheckSudoku({
      variables: {
        checkSudokuInput: {
          puzzle: submit,
          userSubmitted: true
        }
      }
    })
  }

  return (
    <Card
      type='inner'
      title={dateFormatted(createdAt)}
      extra={<ShowSolutionButton showSolution={showSolution} setShowSolution={setShowSolution} />}
    >

      {
        percent &&
          <Progress
            percent={percent}
            status='active'
            strokeColor={{
              from: blue[4],
              to: purple[4]
            }}
          />
      }

      <Board rows={puzzleFormatted} heightOffset={15} cellClick={cellClick} />

      <NumberSelect />

    </Card>
  )
}

export default Play
