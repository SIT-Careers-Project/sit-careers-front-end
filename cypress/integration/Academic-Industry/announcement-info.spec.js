describe('The Announcement Information Page', () => {
    it('successfully loads', () => {
      cy.visit('/academic-industry/info-management')
    })
    it('It is a have navbar component', () => {
      cy.get('[data-cy=core-navbar]').should('be.visible')
    })
    it('It is a have button สร้างประกาศ', () => {
      cy.get('button > .px-5').should('be.visible')
      cy.contains('สร้างประกาศ')
    })
    it('It is a have footer component', () => {
      cy.get('[data-cy=core-footer]').should('be.visible')
    })
  })