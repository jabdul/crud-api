"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_NAME = "monitoring/healthz";
const options = {
    log: { collect: true },
    auth: false
};
exports.default = () => ({
    method: "GET",
    path: `/${exports.ROUTE_NAME}`,
    options: Object.assign(Object.assign({}, options), { tags: ["api"] }),
    handler: async (request, h) => {
        request.log([`/${exports.ROUTE_NAME}`], "Checking application health.");
        return h
            .response(JSON.stringify("OK"))
            .code(200)
            .type("application/json");
    }
});
