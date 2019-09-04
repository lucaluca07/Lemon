declare module '*.svg';
declare module '*.less';

declare module 'rc-tree';
declare module 'rc-tree/lib/util';

declare module '*.json' {
  const value: any;
  export const version: string;
  export default value;
}
