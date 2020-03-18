"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create = async ({ db, payload, config, uuid, json /*, log */ }) => {
    const uid = uuid();
    const result = await db.users.create({
        payload: Object.assign(Object.assign({}, payload), { uuid: uid }),
        config
    });
    if (!result) {
        // log(['users', 'error', 'database'], result);
        throw Error(result);
    }
    // const {
    //   firstnam, last
    // }
    return json(result._doc).addLink("self", `/users/${uid}`);
};
exports.default = db => ({
    create: async ({ payload, config, uuid, json, log }) => await create({ db, payload, config, uuid, json, log })
});
