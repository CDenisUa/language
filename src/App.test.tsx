// Core
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
// Components
import App from '@/App'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('renders the nav bar and defaults to the German theme and Ukrainian interface', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    )

    expect(screen.getByText('Sprachlabor')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Панель' })).toBeInTheDocument()
    expect(document.querySelector('.app-shell')).toHaveAttribute('data-language', 'de')
  })
})
