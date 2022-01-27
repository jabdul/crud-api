"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    title: 'Users document',
    type: 'object',
    properties: {
        lastname: {
            type: 'string',
        },
        firstname: {
            description: 'User email address',
            type: 'string',
        },
        uuid: {
            description: 'User ID',
            type: 'string',
        },
        meta: {
            description: 'Metadata',
            type: 'object',
            properties: {
                active: {
                    type: 'boolean',
                },
                created: {
                    type: 'string',
                    format: 'date-time',
                },
                updated: {
                    type: 'string',
                    format: 'date-time',
                },
            },
        },
    },
};
//# sourceMappingURL=json.js.map