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

  await page.evaluate(async () => {
    await document
      .querySelector("#search-wrapper > div.input-wrapper > label > button")
      .click();
  });

  await page.evaluate(() => {
    // click button copy
    // await document.querySelector(".copy").click();

    const num = document.querySelector(
      "#tag-generator > div.tagbox"
    ).childElementCount;

    const keys = [];
    let element;

    for (let i = 1; i <= num; i++) {
      element = document.querySelector(
        `#tag-generator > div.tagbox > span:nth-child(${i})`
      ).textContent;
      keys.push(element);
    }
    console.log(keys);
  });

  // open a new page in the browser
  // const newPage = await browser.newPage();

  // navigate to the google docs page
  // await newPage.goto(
  //   "https://docs.google.com/document/d/1X5hEv2g5xOqXs_ixBHY1nU27WjuBZvjvOVIi1wFDseQ/edit?usp=sharing"
  // );

  print("Encerrando robô...");
  await browser.close();
};

// function to print things
const print = (thing) => {
  console.log(thing);
};

bot();
