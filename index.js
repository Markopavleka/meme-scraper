import { mkdir } from 'node:fs';
import axios from 'axios';
import cheerio from 'cheerio';

// Create directory
mkdir('./meme', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Created directory');
  }
});

/* async function getForum() {
  try {
    const response = await axios.get(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
const htmlData = getForum();
console.log(htmlData); */

const getImgUrls = async () => {
  try {
    const { data } = await axios.get(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );
    const $ = cheerio.load(data);
    const imgUrls = [];

    $('img').each((_idx, el) => {
      const imgUrl = $(el).attr('src');
      if (imgUrl) {
        imgUrls.push(imgUrl);
      }
    });

    return imgUrls;
  } catch (error) {
    throw error;
  }
};

getImgUrls().then((imgUrls) => console.log(imgUrls));

/* await axios({
  method: 'get',
  url: 'https://memegen-link-examples-upleveled.netlify.app/',
  responseType: 'stream',
}).then(function (response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'));
}); */
