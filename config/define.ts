const { ENV_TAG } = process.env

let define = {}
if (ENV_TAG === 'development') {
  define = {
    baseURL: '',
    oauth2GithubClientId: '92d822348018daa85584',
    ohbugApiKey: 'none',
    ohbugEndpoint: '',
  }
}
if (ENV_TAG === 'production') {
  define = {
    baseURL: '/api',
    oauth2GithubClientId: '05adfe1b68c1c92dda44',
    ohbugApiKey:
      'dd1ab3ece8e2ee86089af3123d57341efaec625e853d824aba54a60fbcbbe314',
    ohbugEndpoint: 'https://api.ohbug.net/report',
  }
}

export default define
