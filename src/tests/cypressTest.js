const cypress = require('cypress');

cypress
  .run({
    // the path is relative to the current working directory
    spec: ['./cypress/e2e/Homepage.cy.js', './cypress/e2e/Login.cy.js'],
    video: false,
  })
  .then((results) => {
    console.log('Tests OK');
  })
  .catch((err) => {
    console.error('ERROR', err);
  });
