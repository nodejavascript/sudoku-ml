import React from 'react'

import CreatePuzzle from './CreatePuzzle'

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
        <CreatePuzzle />
      </Space>
    </Card>
  )
}

export default Home
