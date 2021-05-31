describe('The Announcement Search Page', () => {
  it('successfully loads', () => {
    cy.visit('/academic-industry/announcements')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('should have button ค้นหา', () => {
    cy.get('button').should('contain.text', 'ค้นหา')
  })
  it('should have button สมัคร', () => {
    cy.get('button').should('contain.text', 'สมัคร')
  })
})
