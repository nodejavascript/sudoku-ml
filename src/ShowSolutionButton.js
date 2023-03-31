import React from 'react'

import { Button } from 'antd'

const ShowSolutionButton = ({ showSolution, setShowSolution }) => {
  const display = showSolution ? 'Hide solution' : 'Show solution'

  return (
    <Button size='small' onClick={() => setShowSolution(!showSolution)}>{display}</Button>
  )
}

export default ShowSolutionButton
