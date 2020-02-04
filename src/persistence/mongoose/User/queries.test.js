import { factory } from 'factory-girl';

import UserFactory from '../../../../test/factories/user'; // eslint-disable-line no-unused-vars
import queries from './queries'

import { mongooseConnect, config } from '../../../index';

const db = mongooseConnect(config);
let userQueries = queries(db); // eslint-disable-line no-unused-vars

describe('Users queries', () => {

  describe('create', () => {
    it('can create a user', async () => {
      const payload = await factory.attrs('User');

      const user = await userQueries.create({ payload });

      expect(user).toBeDefined()

      expect(user).toHaveProperty('firstname')
      expect(user).toHaveProperty('lastname')
      expect(user).toHaveProperty('uuid')
      expect(user['firstname']).toEqual(payload['firstname'])
      expect(user['lastname']).toEqual(payload['lastname'])
    });

    it('cannot create a user', async () => {
      const payload = await factory.attrs('User', { firstname: undefined });

      try {
        await expect(
          await (async () => userQueries.create({ payload }))(),
        ).resolves.toThrow();
      } catch ({ errors, name, message }) {
        expect(name).toBe('ValidationError');
        expect(message).toMatch(/`firstname` is required/);
        expect(errors).toHaveProperty('firstname')
        expect(errors['firstname']['path']).toBe('firstname');
        expect(errors['firstname']['kind']).toBe('required');
      }

    })
  })
});

describe('findById', () => {
  it('can find a single user', async () => {
    const user = await factory.create('User');
    const findUser = await userQueries.findById({ payload: user.uuid });
    expect(findUser).toBeDefined();
    expect(findUser).toHaveProperty('uuid'); // eslint-disable-line
    expect(findUser).toHaveProperty('uuid');
    expect(findUser).toHaveProperty('uuid');
    expect(findUser['uuid']).toEqual(user['uuid']);
    expect(findUser['firstname']).toEqual(user['firstname']);
    expect(findUser['lastname']).toEqual(user['lastname']);
    expect(findUser['meta.active']).toEqual(user['meta.active'])
  });
  it('cannot find a user with a uuid not in db', async () => {

    try {
      const user = await factory.create('User');
      await (async () => userQueries.findById({ uuid: user.uuid })).rejects.toThrow()
    } catch ({ error, message }) {
      expect(error).toEqual(undefined);
    }
  })
})

describe('updateById', () => {
  it('update a single user', async () => {
    const user = await factory.create('User');
    const updateUser = await userQueries.updateById({ payload: user.uuid });
    console.log('%%%%%%%%%%%%%', payload); // eslint-disable-line



    expect(updateUser).toBeDefined()
    expect(updateUser).toHaveProperty('uuid')
    // expect(user['uuid']).toEqual(payload['uuid'])
    // expect(user['meta.updated']).toEqual(payload['meta.updated'])

  });

  //   it('cannot update user by uuid', async () => {
  //     const payload = await factory.attrs('User', { 'meta.active': false });

  //     await expect(userQueries.updateById({ payload })).rejects.toThrow(new Error(`user update failed`))

  //     // try {
  //     // await expect(
  //     // await (async () => userQueries.updateById({ payload }))(),

  //     // ).resolves.toThrow();
  //     // } catch ({ errors, message }) {
  //     //       // console.log(message); // eslint-disable-line no-unused-vars
  //     //       // expect(name).toBe('undefined');
  //     //       // expect(message).toMatch(/'uuid' Not Found/)
  //     //       // expect(errors).toHaveProperty('payload.uuid');
  //     //       expect(errors['uuid']['path']).toBe('uuid');
  //     //       expect(errors['uuid']['kind']).toBe('required');
  //     // }
  //     // })
}
)
});
