import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Card, Typography } from 'antd'
const { Text } = Typography

const QUERY_NEW_SUDOKU = gql`
  query queryNewSudoku {
    newSudoku
  }
`

const CreatePuzzle = () => {
  const { loading, error, data } = useQuery(QUERY_NEW_SUDOKU)
  const [newSudoku, setNewSudoku] = useState()

  useEffect(() => {
    if (data?.newSudoku) return setNewSudoku(JSON.stringify(data.newSudoku))
  }, [data, setNewSudoku])

  useEffect(() => {
    if (error) console.error('PingResults', error)
  }, [error])

  return (
    <Card
      type='inner'
      title='CreatePuzzle'
      loading={loading}
    >
      <Text>Server:</Text>
      <Text code>{newSudoku && newSudoku}</Text>
    </Card>
  )
}

export default CreatePuzzle
