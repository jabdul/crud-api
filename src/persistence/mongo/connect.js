import { promisify } from 'util';

export default (MongoClient, config) => {
  return promisify(MongoClient.connect)(config.get('mongo.host'));
};
