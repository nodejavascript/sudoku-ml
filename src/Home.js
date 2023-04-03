import React from 'react'

import NewGameButton from './NewGameButton'
import Game from './Game'
import SavedGamesList from './SavedGamesList'

import { Space, Typography } from 'antd'

const { Title } = Typography

const Home = () => {
  return (
    <Space
      direction='vertical'
      size='large'
      style={{ margin: 6 }}
    >

      <Title level={2} style={{ margin: 0 }}>SUDOKU-ML</Title>

      <Game />

      <NewGameButton />

      <SavedGamesList />

    </Space>
  )
}

export default Home
