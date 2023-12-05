describe('test homepage (root page)', () => {
  it('checks that the homepage reanders', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Buk.')
    cy.contains('Posted by')
  })
})
