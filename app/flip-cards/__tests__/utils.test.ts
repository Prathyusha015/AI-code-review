import { shuffleArray, createCardPairs, checkForMatch } from '../utils'

describe('Flip Cards Utils', () => {
  describe('shuffleArray', () => {
    it('returns an array of the same length', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffleArray(original)
      expect(shuffled).toHaveLength(original.length)
    })

    it('contains all original elements', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = shuffleArray(original)
      original.forEach(item => {
        expect(shuffled).toContain(item)
      })
    })

    it('does not modify the original array', () => {
      const original = [1, 2, 3, 4, 5]
      const originalCopy = [...original]
      shuffleArray(original)
      expect(original).toEqual(originalCopy)
    })
  })

  describe('createCardPairs', () => {
    it('creates pairs of cards with correct structure', () => {
      const values = ['🍎', '🍌']
      const cards = createCardPairs(values)
      
      expect(cards).toHaveLength(4)
      expect(cards[0]).toEqual({ id: 0, value: '🍎' })
      expect(cards[1]).toEqual({ id: 1, value: '🍌' })
      expect(cards[2]).toEqual({ id: 2, value: '🍎' })
      expect(cards[3]).toEqual({ id: 3, value: '🍌' })
    })

    it('handles empty input', () => {
      const cards = createCardPairs([])
      expect(cards).toHaveLength(0)
    })
  })

  describe('checkForMatch', () => {
    const cards = [
      { id: 0, value: '🍎' },
      { id: 1, value: '🍌' },
      { id: 2, value: '🍎' },
      { id: 3, value: '🍌' }
    ]

    it('returns true for matching cards', () => {
      expect(checkForMatch(cards, [0, 2])).toBe(true)
      expect(checkForMatch(cards, [1, 3])).toBe(true)
    })

    it('returns false for non-matching cards', () => {
      expect(checkForMatch(cards, [0, 1])).toBe(false)
      expect(checkForMatch(cards, [2, 3])).toBe(false)
    })

    it('returns false for invalid flipped count', () => {
      expect(checkForMatch(cards, [0])).toBe(false)
      expect(checkForMatch(cards, [0, 1, 2])).toBe(false)
      expect(checkForMatch(cards, [])).toBe(false)
    })
  })
})
