import React from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryButtonSelected } from './lib'

import { Row, Col, Tooltip } from 'antd'
import { blue, purple } from '@ant-design/colors'

const Board = ({ rows, heightOffset = 0, cellClick }) => {
  const buttonSelected = useReactiveVar(memoryButtonSelected)

  return rows.map((row, rowIndex) => {
    return (
      <Row
        key={`row_${rowIndex}`}
        justify='space-between'
      >
        {
          row.map(cell => {
            const { key, display, square } = cell

            let marginRight = 5

            if ([2, 5].includes(key)) {
              marginRight += 10
            }

            let marginBottom = 5

            if ([2, 5].includes(rowIndex)) {
              marginBottom += 10
            }

            const color = square % 2 ? blue[5] : purple[4]

            const isClickable = cellClick && display === null

            const cursor = isClickable && 'pointer'
            const tip = isClickable && !buttonSelected && 'Select a number button'

            return (
              <Tooltip
                key={key}
                placement='top'
                title={tip}
              >
                <Col
                  flex={1}
                  onClick={() => isClickable && cellClick(cell, buttonSelected)}
                  style={{
                    border: `1px solid ${color}`,
                    width: 30,
                    height: 30 + heightOffset,
                    marginLeft: 5,
                    marginRight,
                    marginBottom,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 3 + heightOffset / 2,
                    textAlign: 'center',
                    cursor
                  }}
                >
                  {display}
                </Col>
              </Tooltip>
            )
          })
        }
      </Row>
    )
  })
}

export default Board
