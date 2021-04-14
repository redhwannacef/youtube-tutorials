import puppeteer from "puppeteer";

const screenShot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.amazon.co.uk/", { waitUntil: "networkidle2" });
  await page.screenshot({ path: "example.png" });

  await browser.close();
};

screenShot();
