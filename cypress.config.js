const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'd4rtgw',
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://165.227.93.41/lojinha-web/v2/',
    experimentalRunAllSpecs: true,
  },
});
