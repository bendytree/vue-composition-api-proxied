
declare const Vue:any;
declare const VueCompositionAPI:any;

const proxyKey = '__VueCompositionApiProxied__is_proxy';
const noProxyKey = '__VueCompositionApiProxied__no_proxy';

/* istanbul ignore next */
const peerDependencies = {
  Vue: typeof Vue === 'undefined' ? { set:(a:any, b:string, c:any) => a[b] = c } : Vue,
  VueCompositionAPI: typeof VueCompositionAPI === 'undefined' ? { reactive:(a:any) => a } : VueCompositionAPI,
};

const proxyConfig = {
  get: function (target:any, prop:string) {
    return target[prop];
  },
  set: function (target:any, prop:string, value:any) {
    // peerDependencies.Vue.set(target, prop, proxied(value));
    target[prop] = proxied(value);
    target?.__ob__?.dep?.notify?.();
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
  { name: 'Null or Undefined', test: obj => obj === null || obj === undefined, example: null },
  { name: 'Non Objects', test: obj => typeof obj !== 'object', example: 23 },
  { name: 'Already Proxied', test: obj => obj[noProxyKey] === true, example: { [proxyKey]: true } },
  { name: 'No Proxy', test: obj => obj[noProxyKey] === true, example: { [noProxyKey]: true } },
  { name: 'Function', test: obj => obj instanceof Function, example: () => null },
  { name: 'Date', test: obj => obj instanceof Date, example: new Date() },
  { name: 'RegExp //', test: obj => obj instanceof RegExp, example: /foo/ },
  { name: 'RegExp Class', test: obj => obj instanceof RegExp, example: new RegExp('foo') },
  { name: 'ArrayBuffer', test: obj => obj instanceof ArrayBuffer, example: new ArrayBuffer(0) },
  { name: 'Map', test: obj => obj instanceof Map, example: new Map() },
  { name: 'Set', test: obj => obj instanceof Set, example: new Set() },
  { name: 'Proxy', test: obj => isProxied(obj), example: new Proxy({}, {}) },
  { name: 'Promise', test: obj => Object.prototype.toString.call(obj) === '[object Promise]', example: Promise.resolve },
];

export const proxied = (obj: any) => {
  // Skip
  const skip = skips.find(s => s.test(obj));
  if (skip) return obj;

  // Do not re-proxy (future call or for circular references)
  Object.defineProperty(obj, proxyKey, { value: true, enumerable: false });

  // Convert children
  for (const key in obj) {
    obj[key] = proxied(obj[key]);
  }

  return peerDependencies.VueCompositionAPI.reactive(new Proxy(obj, proxyConfig));
};

export const noProxy = <T>(obj: T):T => {
  Object.defineProperty(obj, noProxyKey, { value: true, enumerable: false });
  return obj;
};
