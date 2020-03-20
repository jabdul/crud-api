"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create = async ({ client, payload }) => {
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
exports.default = (client) => ({
    create: async ({ payload }) => await create({ client, payload }),
});
