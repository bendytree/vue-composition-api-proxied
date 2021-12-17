
declare const Vue:any;

const proxyKey = '__is_proxy';

const v:any = typeof Vue === 'undefined' ? { set:(a:any, b:string, c:any) => a[b] = c } : Vue;

const proxyConfig = {
  get: function (target:any, prop:string) {
    if (prop === proxyKey) return true;
    return target[prop];
  },
  set: function (target:any, prop:string, value:any) {
    v.set(target, prop, proxied(value));
    return true;
  }
};

export interface ISkip {
  name: string;
  test: (obj:any) => boolean;
  example: any;
}

export const isProxied = (obj: any) => {
  return obj && obj[proxyKey] === true;
};

export const skips:ISkip[] = [
  { name: 'Function', test: obj => obj instanceof Function, example: () => null },
  { name: 'Date', test: obj => obj instanceof Date, example: new Date() },
  { name: 'RegExp //', test: obj => obj instanceof RegExp, example: /foo/ },
  { name: 'RegExp Class', test: obj => obj instanceof RegExp, example: new RegExp('foo') },
  { name: 'ArrayBuffer', test: obj => obj instanceof ArrayBuffer, example: new ArrayBuffer(0) },
  { name: 'Map', test: obj => obj instanceof Map, example: new Map() },
  { name: 'Set', test: obj => obj instanceof Set, example: new Set() },
  { name: 'Proxy', test: obj => isProxied(obj), example: new Proxy({}, {}) },
];

export const proxied = (obj: any) => {
  // Only objects get proxied
  if (!obj) return obj;
  if (typeof obj !== 'object') return obj;

  // Run other skip checks
  const skip = skips.find(s => s.test(obj));
  if (skip) return obj;

  // Convert children
  for (const key in obj) {
    obj[key] = proxied(obj[key]);
  }

  // Create proxy
  return new Proxy(obj, proxyConfig);
};
