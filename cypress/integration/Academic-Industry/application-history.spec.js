describe('The Application History Page', () => {
  it('successfully loads', () => {
    cy.visit('/academic-industry/applications/history')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('should show header ประวัติการสมัครงาน and application history tables.', () => {
    cy.contains('ประวัติการสมัครงาน')
    cy.get('.MuiTableHead-root ')
  })
})
