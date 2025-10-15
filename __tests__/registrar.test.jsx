import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
/*import ClienteForm from '../src/app/components/ClienteForm'*/
import Page from '../src/app/registrar/page'
 
describe('registrar', () => {
  it('renderiza sem erros', () => {
    render(<Page />)
  })
})