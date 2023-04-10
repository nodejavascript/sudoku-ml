import React from 'react'
import { Card, Space, Avatar, Typography } from 'antd'

const { Text, Title } = Typography

const SiteTitle = () => {
  return (
    <Space align='center' size='large' style={{ margin: 6 }}>
      <Avatar size={64} shape='square' src='https://res.cloudinary.com/nodejavascript-com/image/upload/v1680206937/sudoku.nodejavascript.com/sudoku.png' />
      <Title level={3}>sudoku-ml</Title>
    </Space>
  )
}

const SiteHeader = () => {
  return (
    <Card
      title={<SiteTitle />}
    >
      <Text italic>
        Client side playable Sudoku game with connection to dvsml.com to use Machine Learning to solve, too.
      </Text>
    </Card>
  )
}

export default SiteHeader
