import React from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryButtonSelected } from './lib'

import { Space, Button } from 'antd'

const NumberSelect = () => {
  const buttonSelected = useReactiveVar(memoryButtonSelected)

  return (
    <Space
      size='large'
      style={{ margin: 5 }}
    >
      {
        [...Array(9).keys()].map(i => {
          const display = i + 1

          let type
          if (display === buttonSelected) type = 'primary'

          return (
            <Button
              key={`button_${i}`}
              type={type}
              onClick={() => memoryButtonSelected(display)}
            >
              {display}
            </Button>
          )
        })
      }
    </Space>
  )
}

export default NumberSelect
