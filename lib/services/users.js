"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db) {
  return {
    findAll: async function findAll() {
      return await db.users.findAll();
    },
    find: async function find() {
      return await db.users.find();
    },
    upsert: async function upsert() {
      return await db.user.upsert();
    },
    create: async function create() {
      return await db.users.create();
    }
  };
};