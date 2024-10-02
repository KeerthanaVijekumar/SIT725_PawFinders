import { test, expect } from "@playwright/test";

test("Book a Sitter with a service", async ({ page }) => {
  await page.goto("http://localhost:3041/");
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
  await page.goto("http://localhost:3041/dashboard");
  await page.getByRole("link", { name: "Find a Sitter" }).click();
  await page.getByPlaceholder("Suburb or address").click();
  await page.getByPlaceholder("Suburb or address").fill("melton");
  await page.getByRole("button", { name: "Search" }).click();
  await page.getByRole("button", { name: "Contact" }).click();
  await page.getByRole("button", { name: "Book for Services" }).click();
  await page.getByText("auto_fix_highBook Me").nth(1).click();
  await page.getByLabel("Date").fill("2024-10-02");
  await page.getByLabel("Time").fill("11:02");
  await page.getByText("Submit").click();
});

test("View notifications and confirm a pending notification as a walker", async ({
  page,
}) => {
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
  await page.getByText("View bookings").click();
  await page.getByRole("button", { name: "check_circle Confirm" }).click();
  await page.getByText("Confirmed").click();
  await page.getByRole("link", { name: "Logout" }).click();
});

test("View Notifications as a Owner", async ({ page }) => {
  await page.goto("http://localhost:3041/");
  await page.getByLabel("Username").fill("testowner@gmail.com");
  await page.getByText("Password").click();
  await page.getByLabel("Password").fill("1234");
  await page.getByText("Dog owner").click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByText("View bookings").click();
  await page.getByText("Confirmed").click();
  await page.getByRole("link", { name: "Leave a Review" }).click();
});
