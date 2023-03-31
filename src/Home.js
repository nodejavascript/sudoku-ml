import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

import { memoryCurrentGame } from './lib'
import { addGameToStorage } from './logic'

import Game from './Game'
import SavedGamesList from './SavedGamesList'

import { Card, Space, Button } from 'antd'

const MUTATION_NEW_SUDOKU = gql`
  mutation mutationNewSudoku {
    newSudoku {
      puzzleFormatted {
        key
        column
        row
        square
        display
      },
      solvedFormatted {
        key
        column
        row
        square
        display
      },
      puzzle,
      solved
    }
  }
`

const Home = () => {
  const createNewGame = () => mutationNewSudoku()
  const [mutationNewSudoku, { error, data }] = useMutation(MUTATION_NEW_SUDOKU)

  useEffect(() => {
    if (error) console.error('mutationNewSudoku', error)
  }, [error])

  useEffect(() => {
    if (!data?.newSudoku) return

    const gameId = uuidv4()
    const createdAt = new Date()

    const { newSudoku } = data

    const newGame = {
      gameId,
      createdAt,
      ...newSudoku
    }

    addGameToStorage(newGame)
    memoryCurrentGame(gameId)
  }, [data])

  return (
    <Card
      type='inner'
      title='Home'
      extra={<Button type='primary' onClick={() => createNewGame()}>New game</Button>}
    >
      <Space
        direction='vertical'
        style={{ display: 'flex' }}
        size='large'
      >
        <Game />
        <SavedGamesList />
      </Space>
    </Card>
  )
}

export default Home
