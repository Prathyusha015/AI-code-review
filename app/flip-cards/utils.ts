// Utility functions for the flip cards game
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const createCardPairs = (values: string[]): Array<{ id: number; value: string }> => {
  const pairs = [...values, ...values]
  return pairs.map((value, index) => ({ id: index, value }))
}

export const checkForMatch = (cards: Array<{ id: number; value: string }>, flippedIds: number[]): boolean => {
  if (flippedIds.length !== 2) return false
  const [firstId, secondId] = flippedIds
  return cards[firstId].value === cards[secondId].value
}
