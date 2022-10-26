const puppeteer = require("puppeteer");

const bot = async () => {
  // open the browser window
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // open the website to search keywords
  await page.goto("https://rapidtags.io/generator");

  // keyword to search for
  const keyword = "como cortar vídeos pelo kinemaster";
  print(`Pesquisando por "${keyword}"`);

  await page.evaluate(() => {
    document.querySelector("#searchInput").value = "";
  });

  await page.type("#searchInput", keyword);

  page.evaluate(() => {
    document
      .querySelector("#search-wrapper > div.input-wrapper > label > button")
      .click();
    // JSON.stringify(
    //   document.querySelector("#tag-generator > div.tagbox").children
    // );
  });

  print("Encerrando robô...");
  await browser.close();
};

// function to print things
const print = (thing) => {
  console.log(thing);
};

bot();
