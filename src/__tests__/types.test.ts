import { proxied, skips } from '..';

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

test(`NaN should not be wrapped`, () => {
  const result = proxied(NaN);
  expect(typeof result).toStrictEqual('number');
  expect(isNaN(result)).toStrictEqual(true);
});