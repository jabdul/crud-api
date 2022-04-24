"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (config) => async (mongoose) => {
    const dbConnectOptions = config.has('dbConnectOptions')
        ? Object.assign(Object.assign({}, config.get('dbConnectOptions')), { useNewUrlParser: true }) : { useNewUrlParser: true };
    const opts = Object.assign(Object.assign({
        dbName: `${config.has('mongo.database') ? config.get('mongo.database') : config.get('service.name')}${process.env.NODE_ENV === 'test' ? '_' + process.env.NODE_ENV : ''}`,
    }, dbConnectOptions), { bufferCommands: false, connectTimeoutMS: 10000, useUnifiedTopology: true, autoCreate: false, autoIndex: false });
    return await mongoose.connect(config.get('mongo.host'), opts);
};
//# sourceMappingURL=connect.js.map