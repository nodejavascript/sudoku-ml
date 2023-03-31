import React from 'react'

import NewGameButton from './NewGameButton'
import Game from './Game'
import SavedGamesList from './SavedGamesList'

import { Card, Space } from 'antd'

const Home = () => {
  return (
    <Card
      type='inner'
      title='Sudoku'
      extra={<NewGameButton />}
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
