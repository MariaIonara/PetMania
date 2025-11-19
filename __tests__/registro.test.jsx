import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
/*import ClienteForm from '../src/app/components/ClienteForm'*/
import Page from '../src/app/registro/page'
 
describe('registro', () => {
  it('renderiza sem erros', () => {
    render(<Page />)
  })
})