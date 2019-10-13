/**
 * Gets the `toStringTag` of `value`.
 *
 * @param value The value to query.
 * @returns Returns the `toStringTag`.
 */
const getTag: (value: any) => string = value => {
  return Object.prototype.toString.call(value);
};

export const isObject: (value: any) => boolean = value => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

export const isFunction: (value: any) => boolean = value => {
  if (!isObject(value)) return false;
  const tag = getTag(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
};
