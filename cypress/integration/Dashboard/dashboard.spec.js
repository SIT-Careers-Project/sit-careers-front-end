describe('The Report Management Page', () => {
    it('successfully loads', () => {
      cy.visit('/dashboard/info')
    })
    it('This page contains navbar component', () => {
      cy.get('[data-cy=core-navbar]').should('be.visible')
    })
    it('It is a have footer component', () => {
      cy.get('[data-cy=core-footer]').should('be.visible')
    })
    it('should show header chart', () => {
      cy.contains('จำนวนบริษัท')
      cy.contains('จำนวนนักศึกษาที่สมัครงาน')
      cy.contains('จำนวนประกาศรับสมัครงาน')
    })
  })
  