import React, { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame, dateFormatted, fromNow } from './lib'
import { removeGameFromStorage, returnGamesFromStorage } from './logic'

import { Table, Button, Tag, Popconfirm, Card } from 'antd'

const DeleteGame = ({ gameId, deleteGame }) => {
  return (
    <Popconfirm
      title='Delete game'
      description='Are you sure to delete this game?'
      okText='Yes'
      cancelText='No'
      onConfirm={() => deleteGame(gameId)}
    >
      <Button type='link' danger>X</Button>
    </Popconfirm>
  )
}
const SavedGamesList = () => {
  const currentGameId = useReactiveVar(memoryCurrentGame)
  const loadGame = gameId => memoryCurrentGame(gameId)

  const [games, setGames] = useState(returnGamesFromStorage())

  const deleteGame = gameId => {
    removeGameFromStorage(gameId)
    if (currentGameId === gameId) memoryCurrentGame(false)
    setGames(returnGamesFromStorage())
  }

  useEffect(() => {
    setGames(returnGamesFromStorage())
  }, [currentGameId])

  const columns = [
    {
      dataIndex: 'createdAt',
      title: 'Game',
      render: (value, { gameId, createdAt }) => <Button type='link' onClick={() => loadGame(gameId)}>{dateFormatted(createdAt)}</Button>
    },
    {
      dataIndex: 'createdAt',
      title: 'Created',
      render: createdAt => fromNow(createdAt)
    },
    {
      dataIndex: 'playing',
      title: 'Status',
      render: (value, { gameId }) => gameId === currentGameId && <Tag color='magenta'>Playing...</Tag>
    },
    {
      dataIndex: 'gameId',
      title: 'Delete',
      render: gameId => <DeleteGame gameId={gameId} deleteGame={deleteGame} />
    }
  ]
  return (
    <Card
      type='inner'
      title='Saved games'
    >
      <Table
        size='small'
        columns={columns}
        dataSource={games}
        pagination={false}
      />
    </Card>
  )
}

export default SavedGamesList
