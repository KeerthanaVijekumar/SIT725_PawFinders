import { test, expect } from "@playwright/test";

test("Walker Profile Details", async ({ page }) => {
  await page.goto("http://localhost:3041/");
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
  await page.getByRole("link", { name: "Gallery" }).click();
  await page.getByRole("link", { name: "Find a Sitter" }).click();
  await page.getByText("View bookings").click();
  await page.getByRole("link", { name: "Profile" }).click();
  await page.getByText("test", { exact: true }).click();
  await page.getByText("walker", { exact: true }).click();
  await page.getByText("0897896787").click();
  await page.getByText("testwalker@gmail.com").click();
  await page.getByText("34,melton").click();
  await page.getByText("melton", { exact: true }).click();
  await page.getByText("3456").click();
  await page.getByText("For any changes to your").click();
  await page.getByRole("link", { name: "Logout" }).click();
});
