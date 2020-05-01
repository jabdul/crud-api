import { QueryArgs, Crud, DbClient } from 'src';

const create = async ({ client, payload }): Promise<boolean> => {
  const result = await client
    .table('users')
    .insert({
      uuid: payload.uuid,
      firstname: payload.firstname,
      lastname: payload.lastname,
    })
    .returning('*');

  return result.length && Number.isFinite(result[0]);
};

export default (client: DbClient): Crud<boolean> => ({
  create: async ({ payload }: QueryArgs) => await create({ client, payload }),
});
