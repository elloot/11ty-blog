const Cache = require('@11ty/eleventy-cache-assets');

module.exports = () => {
  const url = 'https://aws.random.cat/meow';
  const imageBuffer = await Cache(url, {
    duration: '1d',
    type: 'buffer'
  });
  return imageBuffer;
};
