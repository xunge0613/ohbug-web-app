declare module 'ua-device';
declare module 'rrweb-player';
declare module '*.css';
declare module '*.png';

declare module '*.less';
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}
