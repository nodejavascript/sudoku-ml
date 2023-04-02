import { getStorageItem, setStorageItem, memoryReloadGames } from '../lib'

export const returnGamesFromStorage = () => {
  const games = getStorageItem('games') || []
  games.map(game => {
    const storedGame = returnGameFromStorage(game.gameId)
    const { percent, progressType } = returnGameProgress(storedGame)
    game.percent = percent
    game.progressType = progressType
  })
  return games
}

export const returnGameFromStorage = gameId => getStorageItem(`gameId_${gameId}`)

export const addGameToStorage = game => {
  const games = returnGamesFromStorage()

  const { gameId, createdAt } = game

  games.unshift({ key: gameId, gameId, createdAt })

  setStorageItem('games', games)

  setStorageItem(`gameId_${gameId}`, game)
}

export const removeGameFromStorage = gameId => {
  const games = returnGamesFromStorage()

  setStorageItem('games', games.filter(i => i.gameId !== gameId))

  setStorageItem(`gameId_${gameId}`)
}

export const updateGameToStorage = (gameId, puzzle, puzzleFormatted) => {
  const updatedAt = new Date()

  const storedGame = returnGameFromStorage(gameId)

  const games = returnGamesFromStorage()
  const gamesIndex = games.findIndex(i => i.key === gameId)

  games[gamesIndex] = { ...games[gamesIndex], puzzle, puzzleFormatted, updatedAt }

  const update = { ...storedGame, puzzle, puzzleFormatted, updatedAt }

  setStorageItem('games', games)
  setStorageItem(`gameId_${gameId}`, update)
  memoryReloadGames(true)
}

export const returnGameProgress = ({ puzzle }) => {
  const percent = parseInt(puzzle.filter(i => i !== null).length / puzzle.length * 100)
  const solved = Boolean(percent === 100)
  const progressType = solved ? 'circle' : 'line'
  return { percent, progressType }
}
