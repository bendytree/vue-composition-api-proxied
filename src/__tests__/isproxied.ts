import { proxied, isProxied } from '..';

test(`isProxied detects proxied`, () => {
  const user = { };
  expect(isProxied(user)).toBe(false);
  expect(isProxied(proxied(user))).toBe(true);
});
