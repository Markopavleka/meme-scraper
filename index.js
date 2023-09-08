import fs from 'node:fs';
import fetch from 'node-fetch';

// create a Folder
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

// filter the urls
const urlPattern = /https:\/\/api\.memegen\.link[^ "]+/g;
const arr = data.match(urlPattern);
const urls = arr.slice(1, 21).map((url) => url.trim());
let i = urls.length;

while (i--) (i + 1) % 2 === 0 && urls.splice(i, 1);

// download the files
const downloadFiles = () => {
  urls.forEach(async (url, index) => {
    try {
      const res = await fetch(url);
      let fileName;
      if (index === 10) {
        fileName = '10.jpg';
      } else {
        fileName = `${(index + 1).toString().padStart(2, '0')}.jpg`;
      } // store the files in meme
      const writeStream = fs.createWriteStream(`./meme/${fileName}`);
      res.body.pipe(writeStream);
      console.log(`Downloaded: ${fileName}`);
    } catch (error) {
      console.error(`Error downloading ${url}: ${error}`);
    }
  });
};

downloadFiles();
