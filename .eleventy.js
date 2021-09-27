const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const Image = require('@11ty/eleventy-img');
const Cache = require('@11ty/eleventy-cache-assets');
const htmlToAbsoluteUrls = require('@11ty/eleventy-plugin-rss/src/htmlToAbsoluteUrls');

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

function decreaseHeadingSizes(htmlTemplate) {
  let newTemplate = htmlTemplate;
  for (let i = 6; i > 0; i--) {
    let hToReplace = 'h' + i;
    try {
      newTemplate = newTemplate.replaceAll(hToReplace, 'h' + (i + 1));
    } catch (e) {
      continue;
    }
  }
  return newTemplate;
}

async function getRepoReadme(repo) {
  try {
    const readme = Cache(
      `https://raw.githubusercontent.com/${repo.full_name}/main/README.md`,
      {
        duration: '12h',
        type: 'text',
        fethOptions: {
          headers: {
            authorization: process.env.GITHUB_TOKEN
          }
        }
      }
    );
    return readme;
  } catch (e) {
    console.log(e);
    return '';
  }
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addWatchTarget('src/scss');

  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  eleventyConfig.addFilter('getLatestPost', (arr) => {
    return sortByDate(arr, 'date')[0];
  });

  eleventyConfig.addFilter('decreaseHeadingSizes', decreaseHeadingSizes);

  eleventyConfig.addFilter('getRepoReadme', getRepoReadme);

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
