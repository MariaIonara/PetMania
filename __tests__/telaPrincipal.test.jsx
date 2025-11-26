import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import TelaPrincipal from '../src/app/telaPrincipal/page'

describe('telaPrincipal', () => {
  it('renderiza sem erros', () => {
    // Referência: https://react.dev/link/wrap-tests-with-act    
    act(() => {
      render(<TelaPrincipal />)
    });
  })
})