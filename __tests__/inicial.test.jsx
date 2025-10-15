import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
/*import ClienteForm from '../src/app/components/ClienteForm'*/
import Page from '../src/app/inicial/page'
 
describe('inicial', () => {
  it('renderiza sem erros', () => {
    render(<Page />)
  })
})