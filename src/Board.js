import React from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryButtonSelected } from './lib'

import { Row, Col } from 'antd'
import { blue, purple } from '@ant-design/colors'

const Board = ({ gameId, rows, heightOffset = 0, cellClick }) => {
  const buttonSelected = useReactiveVar(memoryButtonSelected)

  // if (!buttonSelected) return 'Oops! select a button to see board'

  return rows.map((row, rowIndex) => {
    return (
      <Row
        key={`row_${rowIndex}`}
        justify='center'
        wrap={false}
      >
        {
          row.map((cell, cellIndex) => {
            const { key: cellKey, display, square } = cell

            const marginBottom = [2, 5].includes(rowIndex) ? 12 : 1
            const marginRight = [2, 5].includes(cellIndex) ? 12 : 1

            const colorArray = square % 2 ? blue : purple

            const isAnswered = display !== null
            const isPuzzle = Boolean(cellClick)
            const isClickable = isPuzzle && !isAnswered

            const cursor = isClickable && 'pointer'

            const backgroundColor = isAnswered && colorArray[1]

            const style = {
              // width: 30,
              // height: 30 + heightOffset,
              // marginLeft: 5,
              padding: 6,
              margin: 1,
              marginRight,
              marginBottom,
              // paddingLeft: 5,
              // paddingRight: 5,
              // paddingTop: 3 + heightOffset / 2,
              textAlign: 'center',
              borderRadius: 2,
              border: `1px solid ${colorArray[5]}`,

              backgroundColor,
              cursor
            }

            const key = `${gameId}_${isPuzzle ? 'puzzle' : 'solution'}_${cellKey}`

            return (
              <Col
                key={key}
                span={2}
                onClick={() => isClickable && cellClick(cell, buttonSelected)}
                style={style}
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
