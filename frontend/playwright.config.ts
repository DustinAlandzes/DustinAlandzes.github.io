import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30_000,
    expect: {
        timeout: 10_000,
    },
    reporter: 'list',
    use: {
        baseURL: 'http://localhost:3200',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    webServer: {
        command: 'npm run dev -- --hostname localhost --port 3200',
        url: 'http://localhost:3200',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
    projects: [
        {
            name: 'mobile-webkit',
            use: {
                ...devices['iPhone 13'],
            },
        },
    ],
});