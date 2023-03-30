import React from 'react'

import AboutApp from './AboutApp'

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
        <AboutApp />
      </Space>
    </Card>
  )
}

export default Home
