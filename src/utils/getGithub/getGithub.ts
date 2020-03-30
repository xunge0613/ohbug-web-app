import Cookies from 'js-cookie'

interface Github {
  id: string
}

function getGithub(): Github {
  const id = Cookies.get('id') as string

  return {
    id
  }
}

export default getGithub
