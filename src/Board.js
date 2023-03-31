import React from 'react'

import { Row, Col } from 'antd'
import { blue, purple } from '@ant-design/colors'

const Board = ({ rows, heightOffset = 0 }) => {
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

            const color = square % 2 ? blue[4] : purple[4]

            return (
              <Col
                key={key}
                flex={1}
                style={{
                  border: `1px solid ${color}`,
                  width: 30,
                  height: 30 + heightOffset,
                  marginLeft: 5,
                  marginRight,
                  marginBottom,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingTop: 3,
                  textAlign: 'center'
                }}
              >
                {display}
              </Col>
            )
          })
        }
      </Row>
    )
  })
}

export default Board
