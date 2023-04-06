import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import humanId from 'human-id'
import ReactGA from 'react-ga4'

import { memoryCurrentGame } from './lib'
import { addGameToStorage } from './logic'

import { Button, message } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const MUTATION_NEW_SUDOKU = gql`
  mutation mutationNewSudoku {
    newSudoku {
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
      solvedFormatted {
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
      solved
      hints {
        display
        rows
        columns
        squares
      }
    }
  }
`

const NewGameButton = () => {
  const [mutationNewSudoku, { error, data }] = useMutation(MUTATION_NEW_SUDOKU)

  useEffect(() => {
    if (error) message.error(error?.message)
  }, [error])

  useEffect(() => {
    if (!data?.newSudoku) return

    const gameId = humanId()
    const createdAt = new Date()

    const category = 'Game'
    const action = 'NewGameButton'
    const label = gameId

    ReactGA.event({
      category,
      action,
      label
    })

    const { newSudoku } = data
    const { puzzleFormatted: originalPuzzleFormatted } = newSudoku

    const newGame = {
      gameId,
      createdAt,
      ...newSudoku,
      originalPuzzleFormatted
    }

    addGameToStorage(newGame)
    memoryCurrentGame(gameId)
  }, [data])

  const createNewGame = () => mutationNewSudoku()

  return (
    <Button
      icon={<PlusCircleOutlined />}
      onClick={() => createNewGame()}
    >
      New game
    </Button>
  )
}

export default NewGameButton
