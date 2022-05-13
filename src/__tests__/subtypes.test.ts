import { proxied, isProxied } from '..';

test(`sub-properties of object are proxied on creation`, () => {
  const user = {
    name: 'Fred',
    pet: { name: 'Brain' },
  };
  const { pet } = user;
  const proxiedUser = proxied(user);
  expect(user).not.toBe(proxiedUser);
  expect(user.name).toStrictEqual(proxiedUser.name);
  expect(pet).not.toBe(proxiedUser.pet);
  expect(pet.name).toStrictEqual(proxiedUser.pet.name);
  expect(JSON.stringify(user)).toStrictEqual(JSON.stringify(proxiedUser));
});

test(`sub-properties of object are proxied after creation`, () => {
  const user = { name: 'Fred' };
  const pet = { name: 'Brain' };
  const proxiedUser = proxied(user);
  proxiedUser.pet = pet;
  expect(isProxied(proxiedUser.pet)).toBe(true);
});

test(`sub-elements of array are proxied on creation`, () => {
  const things = [ 'A', ['B'] ];
  const subthings = things[1];
  const proxiedThings = proxied(things);
  expect(things).not.toBe(proxiedThings);
  expect(things[0]).toStrictEqual(proxiedThings[0]);
  expect(subthings).not.toBe(things[1]);
  expect(subthings[0]).toStrictEqual(proxiedThings[1][0]);
  expect(JSON.stringify(things)).toStrictEqual(JSON.stringify(proxiedThings));
});

test(`push is proxied`, () => {
  const users:[] = [];
  const proxiedUsers = proxied(users);
  const user = {};
  proxiedUsers.push(user);
  expect(users.length).toStrictEqual(1);
  expect(proxiedUsers.length).toStrictEqual(1);
  expect(isProxied(users)).toStrictEqual(true);
  expect(isProxied(proxiedUsers)).toStrictEqual(true);
  expect(isProxied(user)).toStrictEqual(true);
  // @ts-ignore
  expect(isProxied(proxiedUsers[0])).toStrictEqual(true);
});

