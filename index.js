const puppeteer = require("puppeteer");

const bot = async () => {
  // open the browser window
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // open the website to search keywords
  await page.goto("https://rapidtags.io/generator");

  // get the agree button and click on it
  await page.click("#agree");

  // keyword to search for
  const keyword = "como cortar vídeos pelo kinemaster";
  print(`Pesquisando por "${keyword}"`);

  // get the input element and clear it
  const inputElement = await page.$x('//*[@id="searchInput"]');
  inputElement.value = "";

  await page.type("#searchInput", keyword);

  // get the search button and click on it
  await page.click("#search-wrapper > div.input-wrapper > label > button");

  console.log("before waiting");
  await delay(4000);
  console.log("after waiting");

  // get the copy button and click on it
  await page.click(".copy");

  // reload the page
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

  console.log("before waiting");
  await delay(4000);
  console.log("after waiting");

  // focus in the input element
  await page.focus("#searchInput");

  // wait for 500 miliseconds
  console.log("before waiting");
  await delay(500);
  console.log("after waiting");

  // paste the keyboards in the input element
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyV");
  await page.keyboard.up("Control");

  // wait for 100 miliseconds
  console.log("before waiting");
  await delay(500);
  console.log("after waiting");

  // copy the keyboards of the input element
  const keywords = await page.evaluate(() => {
    document.querySelector("#searchInput").value;
  });

  // wait for 500 miliseconds
  console.log("before waiting");
  await delay(50);
  console.log("after waiting");
  console.log(keywords);

  print("Encerrando robô...");
  await browser.close();
};

// function to print things
function print(thing) {
  console.log(thing);
}

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

bot();
