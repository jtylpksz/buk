import { generateName } from '../utils/generateRandomName';
import { randomString } from '../utils/randomString';

describe('Testing auth actions', () => {
  Cypress.config('defaultCommandTimeout', 25000);

  const randomUsername = generateName();
  const randomPassword = randomString(8);
  const anotherRandomPassword = randomString(16);

  it('test sign up and login modals', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-cy="signUpModalButton"]').click();

    cy.get('[data-cy="usernameInput"]').type(randomUsername);

    cy.get('[data-cy="passwordInput"]').type(randomPassword);

    cy.get('[data-cy="createAccountButton"]').click();

    cy.get('[data-cy="accountButton"]').click();
    cy.get('[data-cy="logoutButton"]').click();

    cy.get('[data-cy="signInModalButton"]').click();

    cy.get('[data-cy="usernameInput"]').type(randomUsername);

    cy.get('[data-cy="passwordInput"]').type(randomPassword);

    cy.get('[data-cy="loginButton"]').click();

    // Post testing
    cy.get('[data-cy="createPostInput"]').click();

    cy.get('[data-cy="postTitle"]').type(`Cypress ${randomUsername}`);
    cy.get('[data-cy="postContent"]').type('Testing post content');
    cy.get('[data-cy="createPostButton"]').click();

    cy.contains(`Cypress ${randomUsername}`).click();

    // Comments
    cy.contains('Comments');
    cy.get('[data-cy="commentInput"]').type(
      `Testing comment ${randomUsername}`
    );
    cy.get('[data-cy="submitComment"]').click();

    cy.contains(`Testing comment ${randomUsername}`);

    cy.get('[data-cy="bukLogo"]').click();

    // Search
    cy.get('[data-cy="searchInput"]').type(`Cypress ${randomUsername}`);
    cy.get('[data-cy="searchButton"]').click();

    cy.contains(`Cypress ${randomUsername}`).click();

    cy.get('[data-cy="bukLogo"]').click();

    // Settings
    cy.get('[data-cy="accountButton"]').click();
    cy.get('[data-cy="settingsButton"]').click();

    cy.url().should('eq', 'http://localhost:3000/settings');

    cy.get('[data-cy="changePasswordOpenModalButton"]').click();

    cy.get('[data-cy="currentPasswordInput"]').type(randomPassword);

    cy.get('[data-cy="newPasswordInput"]').type(anotherRandomPassword);

    cy.get('[data-cy="changePasswordButton"]').click();

    cy.contains('Password changed successfully.');

    // Test if password has changed successfully

    cy.visit('http://localhost:3000');

    cy.get('[data-cy="accountButton"]').click();
    cy.get('[data-cy="logoutButton"]').click();

    cy.get('[data-cy="signInModalButton"]').click();
    cy.get('[data-cy="usernameInput"]').type(randomUsername);

    cy.get('[data-cy="passwordInput"]').type(anotherRandomPassword);

    cy.get('[data-cy="loginButton"]').click();

    // Delete Account Option Testing

    cy.get('[data-cy="accountButton"]').click();
    cy.url().should('eq', 'http://localhost:3000/settings');
    cy.get('[data-cy="deleteAccountOpenModalButton"]').click();

    cy.get('[data-cy="passwordInput"]').type(anotherRandomPassword);
    cy.get('[data-cy="deleteAccountButton"]').click();
    cy.contains('Account deleted successfully.');
  });
});
