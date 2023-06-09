import React from 'react'
import { useReactiveVar } from '@apollo/client'

import { memoryButtonSelected, memoryShowHints } from './lib'
import { returnGameFromStorage } from './logic'

import { Row, Col } from 'antd'
import { blue, purple, grey } from '@ant-design/colors'

const Board = ({ gameId, rows, cellClick }) => {
  const showHints = useReactiveVar(memoryShowHints)

  const { originalPuzzleFormatted, hints } = returnGameFromStorage(gameId)

  const buttonSelected = useReactiveVar(memoryButtonSelected)

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

            const isPuzzle = Boolean(cellClick)

            const key = `${gameId}_${isPuzzle ? 'puzzle' : 'solution'}_${cellKey}`

            const marginBottom = [2, 5].includes(rowIndex) ? 6 : 1
            const marginRight = [2, 5].includes(cellIndex) ? 6 : 1

            const isAnswered = display !== null
            const isClickable = isPuzzle && !isAnswered

            const isOriginal = Boolean(isPuzzle && originalPuzzleFormatted[rowIndex].find(i => i.key === cellKey).display !== null)

            const colorArray = square % 2 ? blue : purple

            let backgroundColor = isAnswered && colorArray[isOriginal ? 3 : 2]

            if (showHints && isPuzzle && !backgroundColor && buttonSelected) {
              const { rows: matchRows, columns: matchColumns, squares: matchSquares } = hints.find(i => i.display === buttonSelected)

              const cellFound = Boolean(matchRows.find(i => i === cell.row) || matchColumns.find(i => i === cell.column) || matchSquares.find(i => i === cell.square))

              backgroundColor = cellFound && grey[0]
            }

            const cursor = isClickable && 'pointer'

            const style = {
              padding: 6,
              margin: 1,
              textAlign: 'center',
              borderRadius: 2,
              border: `1px solid ${colorArray[5]}`,

              marginBottom,
              marginRight,
              backgroundColor,
              cursor
            }

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
