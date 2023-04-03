import React from 'react'
import { useReactiveVar } from '@apollo/client'
import ReactGA from 'react-ga4'

import { memoryButtonSelected } from './lib'

import { Row, Col, Button } from 'antd'

const NumberSelect = () => {
  const buttonSelected = useReactiveVar(memoryButtonSelected)

  const numberSelect = display => {
    if (memoryButtonSelected() !== display) { // a different button click
      const category = 'UI'
      const action = 'NumberSelect'
      const value = display

      ReactGA.event({
        category,
        action,
        value
      })
      memoryButtonSelected(display)
    }
  }

  return (
    <Row
      size='small'
      align='middle'
      justify='space-between'
    >
      {
        [...Array(9).keys()].map(i => {
          const display = i + 1

          let type
          if (display === buttonSelected) type = 'primary'

          return (
            <Col
              key={`button_${i}`}
            >
              <Button
                type={type}
                shape='circle'
                onClick={() => numberSelect(display)}
              >
                {display}
              </Button>
            </Col>
          )
        })
      }
    </Row>
  )
}

export default NumberSelect
