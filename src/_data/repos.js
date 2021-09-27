const Cache = require('@11ty/eleventy-cache-assets');
require('dotenv').config();

module.exports = async () => {
  try {
    const data = Cache('https://api.github.com/users/elloot/repos', {
      duration: '12h',
      type: 'json',
      fethOptions: {
        headers: {
          authorization: process.env.GITHUB_TOKEN
        }
      }
    });
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};
