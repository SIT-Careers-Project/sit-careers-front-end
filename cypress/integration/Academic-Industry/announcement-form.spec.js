describe('The Announcement Form Page', () => {
  it('successfully loads', () => {
    cy.visit('/academic-industry/form-create')
  })
  it('This page contains navbar component', () => {
    cy.get('[data-cy=core-navbar]').should('be.visible')
	})
	it('It is a have footer component', () => {
		cy.get('[data-cy=core-footer]').should('be.visible')
	})
	it('should show modal create announcement when click button บันทึกและประกาศ.', () => {
		cy.contains('บันทึกและประกาศ').click()
		cy.contains('บันทึกและประกาศ')
		cy.contains('คุณต้องการบันทึกและประกาศรับสมัครงานใช่หรือไม่')
		cy.get('button').should('contain.text', 'บันทึก')
		cy.get('button').should('contain.text', 'ยกเลิก')
  })
})
