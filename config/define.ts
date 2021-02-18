const { ENV_TAG } = process.env

let define = {}
if (ENV_TAG === 'development') {
  define = {
    baseURL: '',
    oauth2GithubClientId: '92d822348018daa85584',
  }
}
if (ENV_TAG === 'production') {
  define = {
    baseURL: '/api',
    oauth2GithubClientId: '',
  }
}

export default define
