import { getStorageItem, setStorageItem, memoryReloadGames } from '../lib'

export const returnGamesFromStorage = () => getStorageItem('games') || []

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

  // setStorageItem(`gameId_${gameId}`, game)
}
