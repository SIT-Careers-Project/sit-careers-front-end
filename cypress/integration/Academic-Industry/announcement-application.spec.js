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
  it.skip('Go to application page', () => {
    cy.contains('สมัคร').click()
  })
  it.skip('should show ยืนยันการสมัคร page if student have profile', () => {
    cy.contains('สมัคร:')
    cy.contains('โปรดตรวจสอบข้อมูลการสมัครงานของคุณก่อนกดสมัคร')
    cy.contains('ชื่อ:')
    cy.contains('สาขา:')
    cy.contains('ชั้นปี:')
    cy.contains('เบอร์โทรศัพท์:')
    cy.contains('อีเมล:')
    cy.contains('Link ผลงาน:')
  })
  it.skip('should show alert page if student not have profile', () => {
    cy.contains('คุณไม่สามารถสมัครได้')
    cy.contains('กรุณาสร้างโปรไฟล์สมัครงานของคุณ')
  })
})
