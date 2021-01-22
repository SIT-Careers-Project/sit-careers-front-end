describe('The Announcement Application Form Page', () => {
  it('successfully loads', () => {
    cy.visit('/academic-industry/form-application')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('should show button ยืนยันการสมัคร', () => {
    cy.get('button').should('contain.text', 'ยืนยันการสมัคร')
  })
})
