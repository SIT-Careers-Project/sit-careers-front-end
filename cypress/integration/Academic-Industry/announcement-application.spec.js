describe('The Announcement Application Form Page', () => {
  it('successfully loads', () => {
    cy.visit('/academic-industry/announcements')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('Go to application page', () => {
    cy.contains('สมัคร').click()
  })
})
