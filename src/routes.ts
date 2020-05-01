import createUser from './users/routes';
import { Route } from 'src';

export default (): Route[] => [createUser];
