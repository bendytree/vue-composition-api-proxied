import {isProxied, noProxy, proxied, skips } from '..';

const examples = [
  { name: 'Plain Object', example: {}, wrap: true },
  { name: 'Plain Array', example: [], wrap: true },
  { name: 'true', example: true, wrap: false },
  { name: 'false', example: false, wrap: false },
  { name: 'null', example: null, wrap: false },
  { name: 'undefined', example: undefined, wrap: false },
  { name: '0', example: 0, wrap: false },
  { name: '2.3', example: 2.3, wrap: false },
  { name: 'hi', example: 'hi', wrap: false },
];

for (const example of examples) {
  test(`${example.name} ${example.wrap ? 'should be' : 'should not be'} wrapped`, () => {
    const equal = example.example === proxied(example.example);
    expect(equal).toStrictEqual(!example.wrap);
  });
}

for (const skip of skips) {
  test(`${skip.name} should not be wrapped`, () => {
    expect(skip.example).toStrictEqual(proxied(skip.example));
  });
}

test(`Promise should not be wrapped`, async () => {
  const prom = Promise.resolve(8);
  const promProxied = proxied(prom);
  expect(prom).toStrictEqual(promProxied);
  const result = await promProxied;
  expect(result).toStrictEqual(8);
});

test(`NaN should not be wrapped`, () => {
  const result = proxied(NaN);
  expect(typeof result).toStrictEqual('number');
  expect(isNaN(result)).toStrictEqual(true);
});

test(`No-proxy prevents a prop from being proxied`, () => {
  const obj = proxied({ x: { } } as any);
  obj.y = {};
  obj.z = noProxy({a:9});
  expect(isProxied(obj)).toStrictEqual(true);
  expect(isProxied(obj.x)).toStrictEqual(true);
  expect(isProxied(obj.y)).toStrictEqual(true);
  expect(isProxied(obj.z)).toStrictEqual(false);
  expect(JSON.stringify(obj)).toStrictEqual('{"x":{},"y":{},"z":{"a":9}}');
});
