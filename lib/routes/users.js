'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyUserById = destroyUserById;
exports.createNewUser = createNewUser;
exports.updateUserById = updateUserById;
exports.findUserById = findUserById;

var options = {
  log: { collect: true }
};

async function findAll(_ref) {
  var users = _ref.users;

  return await users.findAll();
}

async function find() {
  return await 'Found you okiki oye-lawrence';
}

async function upsert() {
  return await 'Your info has been updated okiki oye-lawrence!!!';
}

async function create() {
  return await 'Thanks for opening an account';
}

async function destroy() {
  return await 'Bye okiki oye-lawrence!!!';
}

function destroyUserById() {
  return {
    method: 'DELETE',
    path: '/users/{user}',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Delete user by ID');
      return h.response((await destroy())).code(204);
    }
  };
}

function createNewUser() {
  return {
    method: 'POST',
    path: '/users/',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Create new user');
      return h.response((await create())).code(201);
    }
  };
}

function updateUserById() {
  return {
    method: 'PUT',
    path: '/users/{user}',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Update user by ID');
      return h.response((await upsert())).code(200);
    }
  };
}

function findUserById() {
  return {
    method: 'GET',
    path: '/users/{user}',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Find user by ID');
      return h.response((await find())).code(200);
    }
  };
}

exports.default = function (_ref2) {
  var services = _ref2.services;
  return {
    method: 'GET',
    path: '/users/',
    options: options,
    handler: async function handler(request, h) {
      request.log(['users'], 'Fetch all users');
      return h.response((await findAll(services))).code(200);
    }
  };
};