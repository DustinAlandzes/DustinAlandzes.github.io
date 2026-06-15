import { expect, test, type Page } from '@playwright/test';

const backToTopSelector = '#back-to-the-top-link';
const revealThreshold = 300;

async function getMaxScroll(page: Page): Promise<number> {
    return page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
}

async function scrollToOffset(page: Page, top: number): Promise<void> {
    await page.evaluate((nextTop) => window.scrollTo(0, nextTop), top);
    await page.waitForFunction((expectedTop) => Math.abs(window.scrollY - expectedTop) <= 2, top);
}

test.describe('BackToTheTop mobile behavior', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test('reveals after scrolling past the threshold and stays inside the viewport', async ({ page }) => {
        const backToTopButton = page.locator(backToTopSelector);

        await expect(backToTopButton).toHaveCount(0);

        const maxScroll = await getMaxScroll(page);
        expect(maxScroll).toBeGreaterThan(revealThreshold + 50);

        await scrollToOffset(page, revealThreshold - 50);
        await expect(backToTopButton).toHaveCount(0);

        const visibleOffset = Math.min(revealThreshold + 150, maxScroll);
        expect(visibleOffset).toBeGreaterThan(revealThreshold);

        await scrollToOffset(page, visibleOffset);
        await expect(backToTopButton).toBeVisible();

        const viewport = page.viewportSize();
        expect(viewport).not.toBeNull();

        const buttonBox = await backToTopButton.boundingBox();
        expect(buttonBox).not.toBeNull();

        const safeViewport = viewport!;
        const safeButtonBox = buttonBox!;

        expect(safeButtonBox.x).toBeGreaterThanOrEqual(0);
        expect(safeButtonBox.y).toBeGreaterThanOrEqual(0);
        expect(safeButtonBox.x + safeButtonBox.width).toBeLessThanOrEqual(safeViewport.width);
        expect(safeButtonBox.y + safeButtonBox.height).toBeLessThanOrEqual(safeViewport.height);
    });

    test('tapping the button returns the page to the top and hides it again', async ({ page }) => {
        const backToTopButton = page.locator(backToTopSelector);
        const maxScroll = await getMaxScroll(page);
        const visibleOffset = Math.min(revealThreshold + 150, maxScroll);

        expect(visibleOffset).toBeGreaterThan(revealThreshold);

        await scrollToOffset(page, visibleOffset);
        await expect(backToTopButton).toBeVisible();

        await backToTopButton.tap();

        await page.waitForFunction(() => window.scrollY <= 1);
        await expect(backToTopButton).toHaveCount(0);
    });
});