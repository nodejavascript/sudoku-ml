import React from 'react'

import GameStatus from './GameStatus'

import { Card, Space } from 'antd'

const Home = () => {
  return (
    <Card
      type='inner'
      title='Home'
    >
      <Space
        direction='vertical'
        style={{ display: 'flex' }}
        size='large'
      >
        <GameStatus />
      </Space>
    </Card>
  )
}

export default Home
