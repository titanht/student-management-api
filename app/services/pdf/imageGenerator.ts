import { v4 } from 'uuid';
import fs from 'fs';
import del from 'del';
import path from 'path';
import puppeteer from 'puppeteer';

const defaultViewport = { width: 1600, height: 900 };

const makeImageDir = () => {
  const folderPath = path.join(__dirname, 'images');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export const removeImages = async (images) => {
  const promises: Promise<any>[] = [];
  images.forEach((image) => promises.push(del(image)));
  await Promise.all(promises);
};

export const htmlToImage = async (html = '', viewport = defaultViewport) => {
  makeImageDir();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport(viewport);
  await page.setContent(html);

  const content = await page.$('html');
  const imageBuffer = await content.screenshot({ omitBackground: false });

  await page.close();
  await browser.close();

  const imgPath = path.join(__dirname, 'images', `${v4()}.png`);
  fs.writeFileSync(imgPath, imageBuffer || '');

  return imgPath;
};
