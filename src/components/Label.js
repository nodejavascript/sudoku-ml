import React from 'react'

import { Space, Typography } from 'antd'
const { Text } = Typography

const Label = ({ label, value, type = 'success' }) => {
  return (
    <Space>
      <Text>{label}: </Text>
      <Text type={type}>{value}</Text>
    </Space>
  )
}

export default Label
