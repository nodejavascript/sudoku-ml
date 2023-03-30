import { getStorageItem, setStorageItem } from '../lib'

export const returnGames = () => getStorageItem('games') || []

export const returnGame = gameId => {
  const games = returnGames()
  return games.find(i => i.gameId === gameId)
}

export const addGameToStorage = game => {
  const games = returnGames()

  const { gameId, createdAt } = game

  games.unshift({ key: gameId, gameId, createdAt })

  setStorageItem('games', games)

  setStorageItem(`gameId_${gameId}`, game)
}

export const removeGameFromStorage = gameId => {
  const games = returnGames()

  setStorageItem('games', games.filter(i => i.gameId !== gameId))

  setStorageItem(`gameId_${gameId}`)
}
