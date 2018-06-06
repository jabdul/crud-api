export default async ({ client, payload }) => {
  return await client.table('users').insert({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  }).returning('*');
};
