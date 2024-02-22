describe('Review Product Form Functionality', () => {
  beforeEach(() => {
    cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u')
  })

  it('Berhasil submit form - Menggunakan data yang valid', () => {
    cy.fixture('form.json').its('data_test').then((data) => {
      cy.getDataID('textInput').eq(0).type(data.name)
      cy.getDataID('textInput').eq(1).type(data.phone)
      cy.get('input[value="Affordable"]').click()
      cy.get('[aria-label="5 Star"]').click()
      cy.getDataID('dateContainer').click()
      cy.get('[aria-label="18, February, 2024"]').click()
      cy.getDataID('submitButton').click()
      cy.getDataID('thankYouMessage').should('exist')
    })
    
  })

  it('Failed submit - Submit Blank Field', () => {
    cy.getDataID('submitButton').click()
    cy.getDataID('submitError').should('exist')
    cy.getDataID('submitError').should('contain', '5 question(s) need to be completed before submitting: Question 1,Question 2,Question 3,Question 4,Question 5.')
    cy.fixture('form.json').its('form_error_id').then((data) => {
        cy.getDataID('validationError').eq(0).should('have.attr', 'id', data.q1).and('have.text', 'This question is required.')
        cy.getDataID('validationError').eq(1).should('have.attr', 'id', data.q2).and('have.text', 'This question is required.')
        cy.getDataID('validationError').eq(2).should('have.attr', 'id', data.q3).and('have.text', 'This question is required.')
        cy.getDataID('validationError').eq(3).should('have.attr', 'id', data.q4).and('have.text', 'This question is required.')
        cy.getDataID('validationError').eq(4).should('have.attr', 'id', data.q5).and('have.text', 'This question is required.')
    })
  })

  it('Failed submit - Menggunakan nama lengkap yang invalid (angka)', () => {
    cy.fixture('form.json').its('name_number').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.Q3toQ5()
        cy.contains("Please fill in this field use alphabet only")
    })
    
  })

  it('Failed submit - Menggunakan nama lengkap yang invalid (special character)', () => {
    cy.fixture('form.json').its('name_chara').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.Q3toQ5()
        cy.contains("Please fill in this field use alphabet only")
    })
    
  })

  it('Failed submit - Menggunakan nama lengkap yang invalid (long text, length > 4000)', () => {
    cy.fixture('form.json').its('long_name').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.Q3toQ5()
        cy.contains("Your name is too long")
    })
    
  })

  it('Failed submit - Menggunakan phone number yang invalid (alphabet)', () => {
    cy.fixture('form.json').its('phone_alphabet').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.Q3toQ5()
        cy.contains('Please fill in use number only')
    })
    
  })

  it('Failed submit - Menggunakan phone number yang invalid (special character)', () => {
    cy.fixture('form.json').its('phone_chara').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.Q3toQ5()
        cy.contains('Please fill in use number only')
    })
    
  })

  it('Failed submit - Menggunakan phone number yang invalid (length > 13)', () => {
    cy.fixture('form.json').its('phone_length').then((data) => {
        cy.getDataID('textInput').eq(0).type(data.name)
        cy.getDataID('textInput').eq(1).type(data.phone)
        cy.Q3toQ5()
        cy.contains('Please use valid phone number')
    })
    
  })

  it('Failed submit - Pilih Other pada question no.3 tanpa menulis apapun di textfield', () => {
    cy.fixture('form.json').its('data_test').then((data) => {
      cy.getDataID('textInput').eq(0).type(data.name)
      cy.getDataID('textInput').eq(1).type(data.phone)
      cy.get('input[value=""]').click()
      cy.get('[aria-label="5 Star"]').click()
      cy.getDataID('dateContainer').click()
      cy.get('[aria-label="18, February, 2024"]').click()
      cy.getDataID('submitButton').click()
      cy.fixture('form.json').its('form_error_id').then((data) => {
        cy.getDataID('validationError').should('have.attr', 'id', data.q3).and('have.text', 'This question is required.')
    })
    })
  })

  it('Cek fitur clear form', () => {
    cy.fill()
    cy.get('button[aria-label="More options"]').click()
    cy.get('[id="ImmersiveReaderMenu"]').within(() => {
      cy.get('[aria-posinset="1"]').should('have.text', 'Enable Immersive Reader')
      cy.get('[aria-posinset="2"]').should('have.text', 'Clear Form').click()
    })
    cy.contains('Clearing form will permanently erase any information you have entered. Are you sure you want to proceed?')
    cy.get('button[aria-label="Clear Form"]').should('have.text', "Clear Form").click()
    cy.getDataID('textInput').should('be.empty')
    cy.get('[type="radio"]').should('have.attr', 'aria-checked', 'false')
    cy.get('[class="-nJ-111"]').should('have.attr', 'aria-checked', 'false')
  })

})