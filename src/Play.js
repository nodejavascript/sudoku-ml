import React, { useEffect, useState } from 'react'
import { gql, useMutation, useReactiveVar } from '@apollo/client'
import ReactGA from 'react-ga4'

import { memoryCurrentGame } from './lib'
import { updateGameToStorage, returnGameFromStorage, returnGameProgress } from './logic'

import Board from './Board'
import NumberSelect from './NumberSelect'
import ShowSolutionButton from './ShowSolutionButton'

import { blue, purple } from '@ant-design/colors'

import { Row, Col, Progress, message, Typography, Space, Card } from 'antd'

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
        squareRowIndex
        squareColIndex
        display
      }
      puzzle
      hints {
        display
        rows
        columns
        squares
      }
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

    const { userSubmitted, correct, puzzle, puzzleFormatted, hints } = data.checkSudoku

    if (userSubmitted) {
      const category = 'Game'
      const action = correct ? 'Correct' : 'Incorrect'
      const label = gameId

      ReactGA.event({
        category,
        action,
        label
      })

      if (correct) message.success('Correct')
      if (!correct) message.error('Incorrect')
    }

    if (userSubmitted && correct) {
      updateGameToStorage(gameId, puzzle, puzzleFormatted, hints)
      setGame(returnGameFromStorage(gameId))
    }
  }, [gameId, data, setGame])

  useEffect(() => {
    if (error) console.log('mutationCheckSudoku', error)
  }, [error])

  if (!game) return null

  const cellClick = (cell, buttonSelected) => {
    if (!buttonSelected) return message.warning('Select a number to place there')

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
      type='inner'
      title={(
        <Row
          justify='space-between'
        >
          <Col>
            <Title level={4} style={{ margin: 0, color: blue[5] }}>{gameId}</Title>
          </Col>
          <Col>
            <ShowSolutionButton showSolution={showSolution} setShowSolution={setShowSolution} />
          </Col>
        </Row>
      )}
      style={{ padding: 0, margin: 0 }}
    >

      <Space
        direction='vertical'
        style={{ display: 'flex' }}
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

        <Board
          key={`game_${gameId}`}
          gameId={gameId}
          rows={puzzleFormatted}
          cellClick={cellClick}
        />

      </Space>

    </Card>
  )
}

export default Play
