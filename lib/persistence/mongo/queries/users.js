'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('util');

var _create = async function _create(_ref) {
  var client = _ref.client,
      payload = _ref.payload,
      config = _ref.config;

  console.log('CLIENT', client); // eslint-disable-line
  var db = await client.db(config.get('mongo.database'));

  return (0, _util.promisify)(db.collection('inserts').insertOne)({
    uuid: payload.uuid,
    firstname: payload.firstname,
    lastname: payload.lastname
  });
};

exports.default = function (client) {
  return {
    create: async function create(payload, config) {
      return await _create({ client: client, payload: payload, config: config });
    }
  };
};