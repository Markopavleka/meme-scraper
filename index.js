import fs from 'node:fs';
import fetch from 'node-fetch';

// import axios from 'axios';

// import { load } from 'cheerio';

// Create a Folder
const folderName = './meme';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
// response to text request
const data = await response.text();

const urlPattern = /https:\/\/api\.memegen\.link[^ ]+/g;
const arr = data.match(urlPattern) || [];
const urls = arr.slice(1, 11).map((url) => url.trim());

urls.map(async (file) => {
  await fetch(file).then((res) => {
    const fileName = function (index) {
      if (index === 10) {
        `{10.jpg`;
      } else {
        `${index + 1}.jpg`;
      }
    };
    response.body.pipe(fs.createWriteStream(`./meme/${fileName}`));
  });
});
