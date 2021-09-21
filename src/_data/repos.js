const axios = require('axios');
const Cache = require('@11ty/eleventy-cache-assets');

module.exports = async () => {
  try {
    const data = Cache('https://api.github.com/users/elloot/repos', {
      duration: '1d',
      type: 'json'
    });
    return data;
  } catch (e) {
    console.log(e);
    return {};
  }
};
