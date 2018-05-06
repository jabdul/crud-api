"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (db) {
  return {
    findAll: async function findAll() {
      return await db.user.findAll();
    }
  };
};