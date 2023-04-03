import React, { useState, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryCurrentGame, friendlyDateFormat, memoryReloadGames } from './lib'
import { removeGameFromStorage, returnGamesFromStorage } from './logic'

import { grey } from '@ant-design/colors'
import { DeleteOutlined, PlayCircleOutlined, PlayCircleTwoTone } from '@ant-design/icons'
import { Table, Button, Popconfirm, Alert, Progress, Space, Row, Typography } from 'antd'

const { Title } = Typography

const DeleteGame = ({ gameId, deleteGame }) => {
  return (
    <Popconfirm
      title='Delete game'
      description='Are you sure to delete this game?'
      okText='Yes'
      cancelText='No'
      onConfirm={() => deleteGame(gameId)}
    >
      <Button type='link' danger><DeleteOutlined /></Button>
    </Popconfirm>
  )
}

const SaveGamesTitle = ({ games }) => {
  return (
    <Row justify='center'>
      <Title level={4} style={{ margin: 0, color: grey[2] }}>SAVED GAMES</Title>
    </Row>
  )
}

const PlayIcon = ({ playing }) => playing ? <PlayCircleTwoTone style={{ fontSize: 24 }} /> : <PlayCircleOutlined style={{ fontSize: 24, color: grey[0], cursor: 'pointer' }} />

const SavedGamesList = () => {
  const currentGameId = useReactiveVar(memoryCurrentGame)
  const reloadGames = useReactiveVar(memoryReloadGames)
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

  useEffect(() => {
    if (reloadGames) {
      setGames(returnGamesFromStorage())
      memoryReloadGames(false)
    }
  }, [reloadGames, setGames])

  if (games.length === 0) return <Alert message='You have no saved games in local storage' banner />

  const columns = [
    {
      dataIndex: 'game',
      title: 'Game',
      render: (value, { gameId, createdAt }) => {
        return (
          <Space
            size='small'
            onClick={() => loadGame(gameId)}
          >

            <PlayIcon playing={gameId === currentGameId} />

            <Button
              size='large'
              type='link'
            >
              {gameId}

            </Button>

          </Space>
        )
      }
    },
    {
      dataIndex: 'last',
      title: 'Last activity',
      render: (value, { createdAt, updatedAt }) => friendlyDateFormat(updatedAt || createdAt)
    },
    {
      dataIndex: 'progress',
      title: 'Progress',
      render: (value, { percent }) => <Progress steps={5} status='active' percent={percent} />
    },
    {
      dataIndex: 'gameId',
      title: 'Delete',
      render: gameId => <DeleteGame gameId={gameId} deleteGame={deleteGame} />
    }
  ]

  return (
    <Table
      title={() => <SaveGamesTitle games={games} />}
      size='small'
      columns={columns}
      dataSource={games}
      pagination={false}
      showHeader
      bordered
    />
  )
}

export default SavedGamesList
