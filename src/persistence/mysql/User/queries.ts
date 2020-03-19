import { QueryArgs } from "src";

const create = async ({ client, payload }: QueryArgs): Promise<boolean> => {
  const result = await client
    .table("users")
    .insert({
      uuid: payload.uuid,
      firstname: payload.firstname,
      lastname: payload.lastname
    })
    .returning("*");

  return result.length && Number.isFinite(result[0]);
};

export default (client): object => ({
  create: async ({ payload, config }: QueryArgs) =>
    await create({ client, payload, config })
});
