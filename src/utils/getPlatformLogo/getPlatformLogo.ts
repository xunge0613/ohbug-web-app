function getPlatformLogo(type: string): string {
  switch (type) {
    case 'JavaScript':
      return require('@/static/images/JavaScript.jpg'); // eslint-disable-line global-require
    case 'NodeJS':
      return require('@/static/images/NodeJS.jpg'); // eslint-disable-line global-require
    default:
      return require('@/static/images/JavaScript.jpg'); // eslint-disable-line global-require
  }
}

export default getPlatformLogo;
