describe('Integration tests', () => {
  it('renders at root level', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/');
  });

  it('has the brand logo with a link', () => {
    cy.get('.navbar-brand').as('logo');
    cy.get('@logo').should('have.attr', 'href', '/');
    cy.get('@logo').find('img').should('have.attr', 'src', 'assets/img/logo.png');
  });

  it('has the contact us button', () => {
    const anchorName = 'contact-form';

    cy.get('.navbar-nav > a.btn').as('button');
    cy.get('@button').should('have.attr', 'href', `#${anchorName}`);
    cy.get('@button').should('have.text', 'Contact Us');
    cy.get(`a[name="${anchorName}"]`).should('exist');

    cy.get('@button').click();
    cy.hash().should('eq', `#${anchorName}`);
    cy.go('back');
  });

  it('has the hero header', () => {
    cy.get('.hero-bg').should('have.css', 'background-image');
    cy.get('.hero-container h1').should('exist');
    cy.get('.hero-container p').should('exist');
  });

  it('has the solutions button', () => {
    const anchorName = 'solutions';

    cy.get(`a.btn[href="#${anchorName}"]`).as('button');
    cy.get('@button').should('have.text', 'Go to Solutions');
    cy.get(`a[name="${anchorName}"]`).should('exist');

    cy.get('@button').click();
    cy.hash().should('eq', `#${anchorName}`);
    cy.go('back');
  });

  it('has the brand logos', () => {
    cy.get('.brand-logo').within(() => {
      cy.get('img').should('have.attr', 'style', 'height:100px;');
    });
  });

  it('has the list of solutions', () => {
    cy.get('h2[data-title="Solutions"]').should('exist');

    cy.get('.solutions').each((item) => {
      cy.get(item).as('solution');
      cy.get('@solution').within(() => {
        cy.get('i[role="img"]').should('exist');
        cy.get('h3.card-title').should('exist');
        cy.get('p.card-text').should('exist');
      });
      cy.get('@solution').then(($solution) => {
        if ($solution.find('a.stretched-link').length) {
          cy.get('@solution').find('a.stretched-link').as('button');
          cy.get('@button').should('have.attr', 'data-bs-toggle');
          cy.get('@solution').find('div.modal').as('modal');
          cy.get('@modal').should('not.be.visible');
          cy.get('@button').click();
          cy.get('@modal').should('be.visible');
          cy.get('@modal').within(() => {
            cy.get('h3.modal-title').should('exist');
            cy.get('div.modal-body').should('exist');
          });

          // To properly wait for the modal to close, we have to pipe the click and continue
          //   clicking until it works. In some test runs, the runner will try to click 17 times
          //   on the button!
          //   More info here: https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
          const click = $el => $el.click();
          cy.get('@modal').find('button.btn').pipe(click).should('not.be.visible')
            .then(() => {
              cy.get('@modal').should('not.be.visible');
            });
        }
      });
    });
  });

  it('has the portfolio', () => {
    cy.get('h2[data-title="Portfolio"]').should('exist');

    cy.get('.portfolio').each((item) => {
      cy.get(item).as('portfolio');
      cy.get('@portfolio').within(() => {
        cy.get('a[target="_blank"]').should('exist');
        cy.get('img.w-100').should('exist');
        cy.get('h3').should('exist');
        cy.get('p').should('exist');
        cy.get('a.btn').should('exist');
      });
    });
  });

  it('has the contact form', () => {
    cy.get('h2[data-title="Contact"]').should('exist');

    cy.get('input[name="subject"]').as('subject');
    cy.get('textarea[name="message"]').as('message');
    cy.get('button[type="submit"]').as('button');

    cy.get('@subject').should('exist');
    cy.get('@message').should('exist');
    cy.get('@button').should('exist');

    cy.get('@button').click();
    cy.get('input:invalid').should('exist');
    cy.get('textarea:invalid').should('exist');
    cy.get('p.success-message').should('not.be.visible');

    const testSubject = 'My Subject';

    cy.get('@subject').type(testSubject);
    cy.get('@button').click();
    cy.get('input:invalid').should('not.exist');
    cy.get('textarea:invalid').should('exist');
    cy.get('p.success-message').should('not.be.visible');

    const testMessage = 'My Text Message';

    cy.get('@message').type(testMessage);
    cy.get('@button').click();
    cy.get('input:invalid').should('not.exist');
    cy.get('textarea:invalid').should('not.exist');
    cy.get('p.success-message').should('be.visible');

    cy.get('a[href*="mailto:"]').as('anchor');
    cy.get('@anchor').should('have.attr', 'href')
      .and('match', /\w+@\w+\.\w+/)
      .and('contain', `subject=${encodeURIComponent(testSubject)}`)
      .and('contain', `body=${encodeURIComponent(testMessage)}`);
  });

  it('has the icon links in footer', () => {
    cy.get('.footer-links a.icon-link').each((item) => {
      cy.get(item).as('icon-link');
      cy.get('@icon-link').should('have.attr', 'href');
      cy.get('@icon-link').should('have.attr', 'target', '_blank');
    });
  });

  it('has the disclaimer text in footer', () => {
    cy.get('.footer-disclaimer p.text-muted small').should('exist');
  });

  it('has the copyright text in footer', () => {
    cy.get('.footer-copyright p').contains(`© ${new Date().getFullYear()}`);
  });

  it('has the required company information', () => {
    cy.get('p.company-info').as('company-info');
    cy.get('@company-info').contains('Registration Address:');
    cy.get('@company-info').contains('Company Name:');
    cy.get('@company-info').contains('Registration Number:');
    cy.get('.footer-copyright p').contains('wolfnetics ltd');
  });
});
