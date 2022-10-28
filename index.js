const puppeteer = require("puppeteer");
require("dotenv").config();

const bot = async () => {
  // print the greetings
  print("Welcome to the keywords finder!");

  // open the browser window
  print("Launching in the browser...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  print("Successfully launched.");
  print("Opening a new page...");
  const page = await browser.newPage();
  print("Successfully opened.");

  // open the website to search keywords
  await page.goto("https://rapidtags.io/generator");
  print("Launched in the website!");

  // get the agree button and click on it
  await page.click("#agree");
  print("Button agree clicked!");

  // keyword to search for
  const keyword = process.env.KEY_TO_SEARCH;
  print(`Pesquisando por "${keyword}..."`);

  // get the input element and clear it
  const inputElement = await page.$x('//*[@id="searchInput"]');
  inputElement.value = "";

  // type the keyword to search for
  await page.type("#searchInput", keyword);

  // get the search button and click on it
  await page.click("#search-wrapper > div.input-wrapper > label > button");
  print("Button search clicked!");

  // wait for 2000 miliseconds
  await delay(2000);

  // get the copy button and click on it
  print("Copying the text...");
  await page.click(".copy");

  // reload the page
  print("Reloading the page...");
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  print("Page successfully reloaded!");

  // wait for 2000 miliseconds
  await delay(2000);

  // focus in the input element
  await page.focus("#searchInput");

  // wait for 500 miliseconds
  await delay(500);

  // paste the keyboards in the input element
  print("Pasting the keywords in the input...");
  await page.keyboard.down("Control");
  await page.keyboard.press("KeyV");
  await page.keyboard.up("Control");

  // wait for 500 miliseconds
  await delay(500);

  // get the keyboards of the input element
  print("Getting the result...");
  const result = await page.evaluate(() => {
    const input = document.querySelector("#searchInput");
    return input.value;
  });

  // print the keywords in the terminal
  print(`"\n"These are the resulting keywords: ${result}`);

  print("\nEncerrando robô...");
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
