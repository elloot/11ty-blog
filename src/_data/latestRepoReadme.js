const Cache = require('@11ty/eleventy-cache-assets');
const getRepos = require('./repos');

module.exports = async () => {
  const repos = await getRepos();
  const sortedRepos = sortByDate(repos, 'updated_at');

  try {
    const readme = Cache(
      `https://raw.githubusercontent.com/${sortedRepos[0].full_name}/main/README.md`,
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
};

function sortByDate(arr, dateName) {
  arr.sort((a, b) => {
    if (a[dateName] < b[dateName]) return 1;
    if (a[dateName] > b[dateName]) return -1;
    return 0;
  });
  return arr;
}
