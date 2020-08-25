const { ENV_TAG } = process.env;

// eslint-disable-next-line import/no-mutable-exports
let define = {};
if (ENV_TAG === 'development') {
  define = {
    baseURL: '',
    oauth2GithubClientId: '92d822348018daa85584',
    ohbugApiKey: 'none',
    ohbugEndpoint: '',
  };
}
if (ENV_TAG === 'test') {
  define = {
    baseURL: '//test.api.ohbug.net',
    oauth2GithubClientId: '62f2b66365e33ddd784a',
    ohbugApiKey: '9a12543e810b52305c41e7a5910f007a9d1de7d61c87cd41d5167bad624ed581',
    ohbugEndpoint: 'https://test.api.ohbug.net/report',
  };
}
if (ENV_TAG === 'production') {
  define = {
    baseURL: '//api.ohbug.net',
    oauth2GithubClientId: '05adfe1b68c1c92dda44',
    ohbugApiKey: 'dd1ab3ece8e2ee86089af3123d57341efaec625e853d824aba54a60fbcbbe314',
    ohbugEndpoint: 'https://api.ohbug.net/report',
  };
}

export default define;
