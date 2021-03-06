const fs = require("fs");
const path = require("path");

const puppeteer = require("puppeteer");

async function capture(templatePath) {
  let screenshotPath;

  const url = `file:///${process.cwd()}/${templatePath}/html/index.html`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 1440 x 990, computer size screen
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url);
  await page.waitFor(10000);
  console.log(`capturing screenshot for ${url} with 1440x900 viewport...`);
  screenshotPath = path.join(
    templatePath,
    "screenshots",
    "screenshot-1440x990.png"
  );
  await page.screenshot({ path: screenshotPath });

  // 768 x 1024, tablet size screen
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto(url);
  await page.waitFor(10000);
  console.log(`capturing screenshot for ${url} with 768x1024 viewport...`);
  screenshotPath = path.join(
    templatePath,
    "screenshots",
    "screenshot-768x1024.png"
  );
  await page.screenshot({ path: screenshotPath });

  // 375 x 667, tablet size screen
  await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 3 });
  await page.goto(url);
  await page.waitFor(10000);
  console.log(`capturing screenshot for ${url} with 375x667 viewport...`);
  screenshotPath = path.join(
    templatePath,
    "screenshots",
    "screenshot-375x667.png"
  );
  await page.screenshot({ path: screenshotPath });
  await browser.close();
}

function main() {
  for (dir of ["bootstrap", "semantic-ui"]) {
    const templates = fs.readdirSync(dir);

    for (template of templates) {
      const templatePath = path.join(dir, template);
      fs.mkdirSync(path.join(templatePath, "screenshots"));
      capture(templatePath);
    }
  }
}

main();
