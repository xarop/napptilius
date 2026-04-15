import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { CartProvider, useCart } from './CartContext'

function CartTestComponent() {
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart } = useCart()
  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="total-price">{totalPrice}</span>
      <ul>
        {items.map((item, i) => (
          <li key={i} data-testid={`item-${i}`}>
            {item.name} x{item.quantity}
            <button onClick={() => removeItem(i)}>remove</button>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          addItem({
            id: 'phone-1',
            name: 'iPhone 15',
            price: 799,
            imageFileName: 'img.jpg',
            selectedColor: '#000',
            selectedStorage: '128 GB',
          })
        }
      >
        add
      </button>
      <button onClick={clearCart}>clear</button>
    </div>
  )
}

function renderCart() {
  return render(
    <CartProvider>
      <CartTestComponent />
    </CartProvider>
  )
}

describe('CartContext', () => {
  it('starts empty', () => {
    renderCart()
    expect(screen.getByTestId('total-items').textContent).toBe('0')
    expect(screen.getByTestId('total-price').textContent).toBe('0')
  })

  it('adds an item', async () => {
    renderCart()
    await userEvent.click(screen.getByRole('button', { name: 'add' }))
    expect(screen.getByTestId('total-items').textContent).toBe('1')
    expect(screen.getByTestId('total-price').textContent).toBe('799')
  })

  it('increments quantity for same item', async () => {
    renderCart()
    const addBtn = screen.getByRole('button', { name: 'add' })
    await userEvent.click(addBtn)
    await userEvent.click(addBtn)
    expect(screen.getByTestId('total-items').textContent).toBe('2')
    expect(screen.getByTestId('item-0').textContent).toContain('x2')
  })

  it('removes an item', async () => {
    renderCart()
    await userEvent.click(screen.getByRole('button', { name: 'add' }))
    await userEvent.click(screen.getByRole('button', { name: 'remove' }))
    expect(screen.getByTestId('total-items').textContent).toBe('0')
  })

  it('clears the cart', async () => {
    renderCart()
    await userEvent.click(screen.getByRole('button', { name: 'add' }))
    await userEvent.click(screen.getByRole('button', { name: 'clear' }))
    expect(screen.getByTestId('total-items').textContent).toBe('0')
  })
})
