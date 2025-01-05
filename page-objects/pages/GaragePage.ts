import { Locator, Page } from "@playwright/test";

export class GaragePage {

    readonly page: Page;
    readonly title: Locator;
    readonly alert: Locator;



    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h1');
        this.alert = page.locator('.alert');
    }

    async getTitle(): Promise<string> {
        return this.title.innerText();
    }

    async getAlertText(): Promise<string> {
        return this.alert.innerText();
    }
}