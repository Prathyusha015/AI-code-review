import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import FlipCardsPage from '../page'

// Mock Math.random to make tests predictable
const mockMath = Object.create(global.Math)
mockMath.random = jest.fn(() => 0.5)
global.Math = mockMath

describe('FlipCardsPage', () => {
  beforeEach(() => {
    // Reset Math.random mock before each test
    mockMath.random.mockReturnValue(0.5)
  })

  it('renders the memory card game title', () => {
    render(<FlipCardsPage />)
    expect(screen.getByText('Memory Card Game')).toBeInTheDocument()
  })

  it('renders 8 cards initially', () => {
    render(<FlipCardsPage />)
    const cards = screen.getAllByText('❓')
    expect(cards).toHaveLength(8)
  })

  it('flips a card when clicked', () => {
    render(<FlipCardsPage />)
    const firstCard = screen.getAllByText('❓')[0]
    
    fireEvent.click(firstCard)
    
    // After clicking, the card should show its value instead of ❓
    expect(firstCard).not.toBeInTheDocument()
  })

  it('matches cards with the same value', async () => {
    render(<FlipCardsPage />)
    const cards = screen.getAllByText('❓')
    
    // Click first two cards (they should be the same due to our mock)
    fireEvent.click(cards[0])
    fireEvent.click(cards[1])
    
    // Wait for the match logic to complete
    await waitFor(() => {
      const matchedCards = screen.queryAllByText('❓')
      expect(matchedCards).toHaveLength(6) // 8 - 2 matched = 6
    }, { timeout: 2000 })
  })

  it('shows win message when all cards are matched', async () => {
    render(<FlipCardsPage />)
    
    // Click all cards to match them
    const cards = screen.getAllByText('❓')
    cards.forEach(card => {
      fireEvent.click(card)
    })
    
    await waitFor(() => {
      expect(screen.getByText('🎉 You Won! 🎉')).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('does not allow clicking already flipped cards', () => {
    render(<FlipCardsPage />)
    const firstCard = screen.getAllByText('❓')[0]
    
    fireEvent.click(firstCard)
    
    // Try to click the same card again
    const flippedCard = screen.getByText('🍎') // Assuming first card shows apple
    fireEvent.click(flippedCard)
    
    // Card should still be flipped, not change
    expect(screen.getByText('🍎')).toBeInTheDocument()
  })
})
