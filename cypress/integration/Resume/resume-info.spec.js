describe('The Resume Page', () => {
    it('successfully loads', () => {
      cy.visit('/resume/info')
    })
    it('This page contains navbar component', () => {
      cy.get('[data-cy=core-navbar]').should('be.visible')
    })
    it('It is a have footer component', () => {
      cy.get('[data-cy=core-footer]').should('be.visible')
    })
    it('should show header โปรไฟล์สมัครงาน and button create', () => {
      cy.contains('โปรไฟล์สมัครงาน')
    })
  })
  