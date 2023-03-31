import React from 'react'

import { Space, Button } from 'antd'

const NumberSelect = () => {
  return (
    <Space
      size='large'
      style={{ margin: 5 }}
    >
      {
        [...Array(9).keys()].map(i => {
          const display = i + 1
          return (
            <Button key={`button_${i}`} size='small'>{display}</Button>
          )
        })
      }
    </Space>
  )
}

export default NumberSelect
