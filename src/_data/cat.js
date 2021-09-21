const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
  const url = 'https://aws.random.cat/meow';
  const imageObject = await Cache(url, {
    duration: '1d',
    type: 'json'
  });
  return imageObject.file;
};
