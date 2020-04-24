import { Server } from 'hapi';
import './env';
declare const application: () => Promise<Server>;
export default application;
