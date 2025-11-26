import '@testing-library/jest-dom'
import { render, screen, act } from '@testing-library/react'
import RegistrarPet from '../src/app/registrarPet/page'

describe('registrarPet', () => {
  it('renderiza sem erros', () => {
    // Referência: https://react.dev/link/wrap-tests-with-act    
    act(() => {
      render(<RegistrarPet />)
    });
  })
})