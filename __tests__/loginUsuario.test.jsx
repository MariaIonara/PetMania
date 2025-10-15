import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
/*import ClienteForm from '../src/app/components/ClienteForm'*/
import Page from '../src/app/loginUsuario/page'
 
describe('loginUsuario', () => {
  it('renderiza sem erros', () => {
    render(<Page />)
  })
})
