import { getStorageItem, setStorageItem } from '../lib'

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
