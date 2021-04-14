import puppeteer from "puppeteer";

const ITEM_URL =
  "https://www.amazon.co.uk/dp/B07PJV3JPR/ref=s9_acss_bw_pg_WFpfn19u_0_i?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=merchandised-search-1&pf_rd_r=5Q9ZX80P1TMYRSMXASZA&pf_rd_t=101&pf_rd_p=70bf6849-fb1d-4f5a-b192-462a68f1dcba&pf_rd_i=15601480031";

const getPrice = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(ITEM_URL, { waitUntil: "networkidle2" });

  const price = await page.$eval(
    "#priceblock_ourprice",
    (element) => element.innerText
  );

  await browser.close();

  return price;
};

getPrice().then(console.log);
