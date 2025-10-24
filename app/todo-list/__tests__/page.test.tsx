import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TodoApp from '../page'

describe('TodoApp', () => {
  it('renders the todo list title', () => {
    render(<TodoApp />)
    expect(screen.getByText('📝 Todo List')).toBeInTheDocument()
  })

  it('shows empty state message when no todos exist', () => {
    render(<TodoApp />)
    expect(screen.getByText('No tasks added yet!')).toBeInTheDocument()
  })

  it('adds a new todo when input is not empty', () => {
    render(<TodoApp />)
    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('does not add empty todos', () => {
    render(<TodoApp />)
    const addButton = screen.getByText('Add')

    fireEvent.click(addButton)
    expect(screen.getByText('No tasks added yet!')).toBeInTheDocument()
  })

  it('clears input after adding todo', () => {
    render(<TodoApp />)
    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)

    expect(input).toHaveValue('')
  })

  it('toggles todo completion status', () => {
    render(<TodoApp />)
    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)

    const todoItem = screen.getByText('Test todo')
    fireEvent.click(todoItem)

    expect(todoItem).toHaveClass('line-through')
  })

  it('removes a todo when delete button is clicked', () => {
    render(<TodoApp />)
    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)

    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(screen.queryByText('Test todo')).not.toBeInTheDocument()
  })

  it('shows correct completion count', () => {
    render(<TodoApp />)
    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    // Add two todos
    fireEvent.change(input, { target: { value: 'Todo 1' } })
    fireEvent.click(addButton)
    fireEvent.change(input, { target: { value: 'Todo 2' } })
    fireEvent.click(addButton)

    // Complete one todo
    const firstTodo = screen.getByText('Todo 1')
    fireEvent.click(firstTodo)

    expect(screen.getByText('1 / 2 completed')).toBeInTheDocument()
  })
})