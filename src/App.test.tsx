// Core
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
// Components
import App from '@/App'

describe('App', () => {
  it('renders the nav bar and defaults to the German theme', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    expect(screen.getByText('Sprachlabor')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    expect(document.querySelector('.app-shell')).toHaveAttribute('data-language', 'de')
  })
})
