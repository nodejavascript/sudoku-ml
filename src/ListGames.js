import React, { useState, useEffect } from 'react'

import { memoryCurrentGame, dateFormatted, fromNow } from './lib'
import { removeGameFromStorage, returnGames } from './logic'

import { Table, Button, Tag } from 'antd'

const ListGames = ({ currentGameId }) => {
  const loadGame = gameId => memoryCurrentGame(gameId)

  const [games, setGames] = useState(returnGames())

  const deleteGame = gameId => {
    removeGameFromStorage(gameId)
    if (currentGameId === gameId) memoryCurrentGame(false)
    setGames(returnGames())
  }

  useEffect(() => {
    setGames(returnGames())
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
      render: gameId => <Button type='link' danger onClick={() => deleteGame(gameId)}>X</Button>
    }
  ]
  return (
    <Table columns={columns} dataSource={games} pagination={false} />
  )
}

export default ListGames
