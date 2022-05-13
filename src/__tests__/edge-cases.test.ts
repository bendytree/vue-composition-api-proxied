import { proxied } from '..';

test(`circular references are ok`, () => {
  const user = { name: 'Keith' } as any;
  user.family = [{ grandpa: user }];
  // This should not stack overflow
  const proxiedUser = proxied(user);
  expect(proxiedUser.name).toBe(user.name);
});
