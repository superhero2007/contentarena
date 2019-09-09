describe('My First Test', function() {
	it('Does not do much! Hola', function() {
		expect(true).to.equal(true)
	});

	it('Login into the Content Arena with wrong password', function() {
		const email = "juancruztalco@gmail.com";
		const password = "Q!w2e3r4d";
		cy.visit('/login');
		cy.get('input[name=_username]').type(email);
		cy.get('input[type=password]').type(`${password}{enter}`)

		cy.get('.login-error').should('contain', 'Incorrect')
	});

	it('Login into the Content Arena with wrong username', function() {
		const email = "juancruztalco@gmail.com234";
		const password = "Q!w2e3r4d";
		cy.visit('/login');
		cy.get('input[name=_username]').type(email);
		cy.get('input[type=password]').type(`${password}{enter}`)

		cy.get('.login-error').should('contain', "The user doesn")
	});

	it('Login into the Content Arena', function() {
		const email = "juancruztalco@gmail.com";
		const password = "Q!w2e3r4";
		cy.visit('/login');
		cy.get('input[name=_username]').type(email);
		cy.get('input[type=password]').type(`${password}{enter}`)

		// we should be redirected to /dashboard
		cy.url().should('include', '/marketplace')
	});



});
