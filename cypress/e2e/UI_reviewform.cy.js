describe('Review Product Form UI', () => {
    beforeEach(() => {
      cy.visit('https://forms.office.com/pages/responsepage.aspx?id=is2XW8LLaEmfFhLKD9VwE9lpKmxdveNGmMWKETZvAWNUMzhBV1lYTlc1SDNRS00xRVg4OFhPODlQTS4u')
    })
  
    it('Verifikasi tampilan form', () => {
      cy.getDataID('formTitle').should('have.text', 'Review our product')
  
      //Cek UI Question 1
      cy.get('[id="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73"]').within(() => {
        cy.get('[class="text-format-content "]').should('have.text', 'Full name')
        //Q1 required
        cy.getDataID('requiredStar').should('exist')
      })
      cy.get('input[aria-labelledby="QuestionId_r9f62b2a1fbe746ab953326f6937d4e73 QuestionInfo_r9f62b2a1fbe746ab953326f6937d4e73"]').should('have.attr', 'placeholder', 'Enter your answer')
  
      //Cek UI Question 2
      cy.get('[id="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110"]').within(() => {
        cy.get('[class="text-format-content "]').should('have.text', 'Phone Number')
        //Q2 required
        cy.getDataID('requiredStar').should('exist')
      })
      cy.get('input[aria-labelledby="QuestionId_r5c2dd5cf6732459894e3d1cb504c8110 QuestionInfo_r5c2dd5cf6732459894e3d1cb504c8110"]').should('have.attr', 'placeholder', 'Enter your answer')
  
      //Cek UI Question 3
      cy.get('[id="QuestionId_r8bc17b753f0048ecb03794ef45037bb7"]').within(() => {
        cy.get('[class="text-format-content "]').should('have.text', 'Do you think your product or service is affordable or expensive?')
        //Q3 required
        cy.getDataID('requiredStar').should('exist')
      })
      cy.get('input[value="Affordable"]').should('have.attr', 'type', 'radio').and('exist')
      cy.get('input[value="Expensive"]').should('have.attr', 'type', 'radio').and('exist')
      cy.get('input[value=""]').should('have.attr', 'type', 'radio').and('exist')
      cy.get('input[placeholder="Other"]').should('exist')
  
      //Cek UI Question 4
      cy.get('[id="QuestionId_r9f97f2550332479a8fdd2914bd99bc1d"]').within(() => {
        cy.get('[class="text-format-content "]').should('have.text', 'Rate our services')
        //Q4 required
        cy.getDataID('requiredStar').should('exist')
      })
      cy.get('[aria-label="1 Star"]').should('exist')
      cy.get('[aria-label="2 Star"]').should('exist')
      cy.get('[aria-label="3 Star"]').should('exist')
      cy.get('[aria-label="4 Star"]').should('exist')
      cy.get('[aria-label="5 Star"]').should('exist')
  
      //Cek UI Question 5
      cy.get('[id="QuestionId_r1abee94394494318b1e34a419838e56c"]').within(() => {
        cy.get('[class="text-format-content "]').should('have.text', 'Review date')
        //Q5 required
        cy.getDataID('requiredStar').should('exist')
      })
      cy.getDataID('dateContainer').should('exist')
      cy.get('input[id="DatePicker0-label"]').should('have.attr', 'placeholder', 'Please input date (M/d/yyyy)')

      //Menampilkan button submit
      cy.getDataID('submitButton').should('be.visible').and('have.css', 'background-color', 'rgb(40, 118, 123)')

      //keterangan bintang merah adalah required field
      cy.getDataID('noticeContainer').contains('Required')

      //Menampilkan fitur untuk clear form
      cy.get('button[aria-label="More options"]').click()
      cy.get('[id="ImmersiveReaderMenu"]').within(() => {
        cy.get('[aria-posinset="1"]').should('have.text', 'Enable Immersive Reader')
        cy.get('[aria-posinset="2"]').should('have.text', 'Clear Form')
      })

    })

    it('Mengecek interaksi radio button', () => {
      cy.get('input[value="Affordable"]').click()
      cy.get('input[value="Affordable"]').should('have.attr', 'aria-checked', 'true')
      cy.get('input[value="Expensive"]').should('have.attr', 'aria-checked', 'false')
      cy.get('input[aria-label="Other answer"]').should('have.attr', 'aria-checked', 'false')

      cy.get('input[value="Expensive"]').click()
      cy.get('input[value="Affordable"]').should('have.attr', 'aria-checked', 'false')
      cy.get('input[value="Expensive"]').should('have.attr', 'aria-checked', 'true')
      cy.get('input[aria-label="Other answer"]').should('have.attr', 'aria-checked', 'false')

      cy.get('input[value=""]').click()
      cy.get('input[placeholder="Other"]').type('Cheap')
      cy.get('input[value="Affordable"]').should('have.attr', 'aria-checked', 'false')
      cy.get('input[value="Expensive"]').should('have.attr', 'aria-checked', 'false')
      cy.get('input[aria-label="Other answer"]').should('have.attr', 'aria-checked', 'true')
      
    })

    it('Cek star rating', () => {
      //Klik pada bintang pertama     
      cy.get('[aria-label="1 Star"]').click()
      cy.get('[aria-label="1 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="2 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })
      cy.get('[aria-label="3 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })
      cy.get('[aria-label="4 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })
      cy.get('[aria-label="5 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })

      //Klik pada bintang kedua    
      cy.get('[aria-label="2 Star"]').click()
      cy.get('[aria-label="1 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="2 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="3 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })
      cy.get('[aria-label="4 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })
      cy.get('[aria-label="5 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })

      //Klik pada bintang ketiga     
      cy.get('[aria-label="3 Star"]').click()
      cy.get('[aria-label="1 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="2 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="3 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="4 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })
      cy.get('[aria-label="5 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })

      //Klik pada bintang keempat     
      cy.get('[aria-label="4 Star"]').click()
      cy.get('[aria-label="1 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="2 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="3 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="4 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="5 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(97, 97, 97)')
      })

      //Klik pada bintang pertama     
      cy.get('[aria-label="5 Star"]').click()
      cy.get('[aria-label="1 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="2 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="3 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="4 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })
      cy.get('[aria-label="5 Star"]').within(() => {
        cy.get('svg').should('have.css', 'fill', 'rgb(40, 118, 123)')
      })

    })

    it('Mengecek interaksi datepicker', () => {
      cy.getDataID('dateContainer').click()
      cy.get('[aria-label="20, February, 2024"]').click()
    })
  })
  