describe('The Report Management Page', () => {
  it('successfully loads', () => {
    cy.visit('/report-management/info')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
  })
  it('It is a have footer component', () => {
    cy.get('[data-cy=core-footer]').should('be.visible')
  })
  it('should show header ดาวห์โหลดรายงานสรุป and 2 tabs', () => {
    cy.contains('ดาวห์โหลดรายงานสรุป')
    cy.contains('เลือกข้อมูล')
    cy.contains('สำเนาที่มี')
  })
})
