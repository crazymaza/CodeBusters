import Avatar from '.'
import { render, screen, fireEvent } from '@testing-library/react'

describe('Тест на UI компонент - Avatar', () => {
  test('Компонент рендерится', () => {
    const { container } = render(<Avatar />)
    expect(container.querySelector('.MuiAvatar-root')).toBeDefined()
  })

  test('Срабатывает changeAvatar handler', async () => {
    const handleChange = jest.fn()

    render(<Avatar changeAvatar={handleChange} />)
    const button = screen.getByTestId('avatar-test-id')

    fireEvent.change(button)

    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
