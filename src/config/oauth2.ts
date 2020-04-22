const REACT_APP_GITHUB_CLIENT_ID = '62f2b66365e33ddd784a';
const REACT_APP_GITHUB_CLIENT_ID_DEV = '92d822348018daa85584';

export const oauth2_github_clientId =
  process.env.NODE_ENV === 'production'
    ? REACT_APP_GITHUB_CLIENT_ID
    : REACT_APP_GITHUB_CLIENT_ID_DEV;

export const oauth2_github_href = `https://github.com/login/oauth/authorize?client_id=${oauth2_github_clientId}`;
