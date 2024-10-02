const { test, expect } = require("@playwright/test");

test.describe("UI Components Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3041");
  });
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Login Page/);
  });
});

test("Signup and Login as a Dog Walker", async ({ page }) => {
  await page.goto("http://localhost:3041/");
  await page.locator("h2").click();
  await page.getByRole("link", { name: "Create an account" }).click();
  await page.getByRole("link", { name: "Dog Walker/Sitter" }).click();
  await page.getByText("First Name*").click();
  await page.getByLabel("First Name*").fill("test");
  await page.getByText("Last Name*").click();
  await page.getByLabel("Last Name*").fill("walker");
  await page.getByText("Phone*").click();
  await page.getByLabel("Phone*").fill("0897896787");
  await page.getByText("Email*").click();
  await page.getByLabel("Email*").fill("testwalker@gmail.com");
  await page.locator(".select-dropdown").first().click();
  await page.getByRole("list").getByText("Passport").click();
  await page.getByText("Document Number").click();
  await page.getByLabel("Document Number").fill("1234");
  await page.locator("div:nth-child(7) > .select-wrapper > input").click();
  await page.getByRole("list").getByText("Veterinary Technician").click();
  await page.getByText("Address*").click();
  await page.getByLabel("Address*").fill("34,melton");
  await page.getByText("Suburb*").click();
  await page.getByLabel("Suburb*").fill("melton");
  await page.getByText("Postal Code*").click();
  await page.getByLabel("Postal Code*").fill("3456");
  await page.locator("div:nth-child(12) > .select-wrapper > input").click();
  await page.getByRole("list").getByText("Solo Walk").click();
  await page.getByText("Pack walk").first().click();
  await page.getByText("Pack walk").nth(1).click();
  await page.getByText("PawFinders Register With Us").click();
  await page.getByText("Password*").click();
  await page.getByLabel("Password*").fill("1234");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText("Username").click();
  await page.getByLabel("Username").fill("testwalker@gmail.com");
  await page.getByText("Password").click();
  await page.getByLabel("Password").fill("1234");
  await page.getByText("Dog walker/ sitter").click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Login" }).click();
});

test("Signup and Login as a Dog Owner", async ({ page }) => {
  await page.goto("http://localhost:3041/");
  await page.getByRole("link", { name: "Create an account" }).click();
  await page.getByRole("link", { name: "Dog Owner" }).click();
  await page.getByText("First Name*").click();
  await page.getByLabel("First Name*").fill("test");
  await page.getByText("Last Name*").click();
  await page.getByLabel("Last Name*").fill("owner");
  await page.getByText("Phone*").click();
  await page.getByLabel("Phone*").fill("0896743456");
  await page.getByText("Email*").click();
  await page.getByLabel("Email*").fill("testowner@gmail.com");
  await page.getByText("Address*").click();
  await page.getByLabel("Address*").fill("23, test, melton");
  await page.getByText("Suburb*").click();
  await page.getByLabel("Suburb*").fill("melton");
  await page.getByText("Postal Code*").click();
  await page.getByLabel("Postal Code*").fill("3124");
  await page.getByText("Create Password*").click();
  await page.getByLabel("Create Password*").fill("1234");
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText("Username").click();
  await page.getByLabel("Username").fill("testowner@gmail.com");
  await page.getByText("Password").click();
  await page.getByLabel("Password").fill("1234");
  await page.getByText("Dog owner").click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Login" }).click();
});
