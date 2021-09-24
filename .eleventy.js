const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require('@11ty/eleventy-img');

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [400, null],
    formats: ['webp', 'jpeg'],
    outputDir: './_site/img'
  });

  let imageAttributes = {
    alt,
    sizes: sizes || '100%',
    loading: 'lazy',
    decoding: 'async'
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

function sortByDate(arr, dateName) {
  arr.sort((a, b) => {
    if (a[dateName] < b[dateName]) return 1;
    if (a[dateName] > b[dateName]) return -1;
    return 0;
  });
  return arr;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addWatchTarget('src/scss');

  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  eleventyConfig.addFilter('getLatestPost', (arr) => {
    return sortByDate(arr, 'date')[0];
  });

  eleventyConfig.addFilter('getLatestRepo', (arr) => {
    arr.forEach((repo) => {
      repo.updated_at = new Date(repo.updated_at);
    });
    return sortByDate(arr, 'updated_at')[0];
  });

  return {
    dir: {
      input: 'src'
    },
    passthroughFileCopy: true
  };
};
