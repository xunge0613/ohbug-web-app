const { ENV_TAG } = process.env;

// eslint-disable-next-line import/no-mutable-exports
let define = {};
if (ENV_TAG === 'development') {
  define = {
    baseURL: '',
    oauth2GithubClientId: '92d822348018daa85584',
  };
}
if (ENV_TAG === 'test') {
  define = {
    baseURL: '//test.api.ohbug.net',
    oauth2GithubClientId: '62f2b66365e33ddd784a',
  };
}
if (ENV_TAG === 'production') {
  define = {
    baseURL: '//api.ohbug.net',
    oauth2GithubClientId: '05adfe1b68c1c92dda44',
  };
}

export default define;
