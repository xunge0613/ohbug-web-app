function getPlatformLogo(type: string): string {
  switch (type) {
    case 'JavaScript':
      return require('../../static/images/JavaScript.jpg')
    case 'NodeJS':
      return require('../../static/images/NodeJS.jpg')
    default:
      return require('../../static/images/JavaScript.jpg')
  }
}

export default getPlatformLogo
