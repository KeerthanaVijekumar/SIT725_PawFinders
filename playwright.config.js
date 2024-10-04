import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['list'],        // This will output the list of tests in the console
    ['json', { outputFile: 'test-results.json' }],  // Generates JSON report
    ['html', { open: 'never' }]  // Generates an HTML report
  ]
});
