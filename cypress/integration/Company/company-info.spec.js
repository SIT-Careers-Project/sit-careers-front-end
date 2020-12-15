
describe('The Company Information Page', () => {
  it('successfully loads', () => {
    cy.visit('/company/info-management')
  })
  it('It is a have navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have button เพิ่มบริษัท', () => {
    cy.get('button > .px-5').should('be.visible')
    cy.contains('เพิ่มบริษัท')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
})