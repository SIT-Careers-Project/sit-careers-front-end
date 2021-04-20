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
  it('should show header ดาวน์โหลดรายงานสรุป', () => {
    cy.contains('ดาวน์โหลดรายงานสรุป')
    cy.contains('เลือกข้อมูลที่ต้องการ')
  })
})
