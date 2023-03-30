import React, { useEffect } from 'react'
import { gql, useMutation, useReactiveVar } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'

import { memoryCurrentGame } from './lib'
import { addGameToStorage } from './logic'

// import Label from './components/Label'
import ListGames from './ListGames'

import { Space, Button } from 'antd'

const MUTATION_NEW_SUDOKU = gql`
  mutation mutationNewSudoku {
    newSudoku
  }
`

const GameStatus = () => {
  const gameId = useReactiveVar(memoryCurrentGame)
  const [mutationNewSudoku, { error, data }] = useMutation(MUTATION_NEW_SUDOKU)

  const createCurrentGame = () => mutationNewSudoku()

  useEffect(() => {
    if (error) console.error('mutationNewSudoku', error)
  }, [error])

  useEffect(() => {
    if (!data?.newSudoku) return

    const gameId = uuidv4()
    const createdAt = new Date()

    const newGame = {
      gameId,
      createdAt,
      puzzle: data.newSudoku
    }

    addGameToStorage(newGame)
    memoryCurrentGame(gameId)
  }, [data])

  return (
    <Space
      direction='vertical'
    >
      <Button type='primary' onClick={() => createCurrentGame()}>New game</Button>
      <ListGames currentGameId={gameId} />
    </Space>
  )
}

export default GameStatus
