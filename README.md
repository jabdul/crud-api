[![CircleCI](https://circleci.com/gh/jabdul/crud-api.svg?style=svg)](https://circleci.com/gh/jabdul/crud-api)
[![Coverage Status](https://coveralls.io/repos/github/jabdul/crud-api/badge.svg?branch=master)](https://coveralls.io/github/jabdul/crud-api?branch=master)

# crud-api
A CRUD microservice module exposing key features of a RESTful API as injected dependencies.

## Installation

```sh
$ yarn add @ctt/crud-api
```

## bootstrapping
To create a new CRUD service API, simply bootstrap the application by injecting the dependencies as depicted in the example below.

```javascript
import { server, mysqlConnect, mongooseConnect, config } from '@ctt/crud-api';
import { schema as mongooseSchema } from './persistence/mongoose/schema';
import routes from './routes';
import services from './services';

server({
  dbConnect: mongooseConnect,   // Connect to db
  schema: mongooseSchema,       // Load the queries and models
  config,                       // Application configuration
  routes,                       // Application Routing
  services,                     // Service response formatter
  swaggerOptions: {             // Swagger options
    tags: {
      'users': 'Operation for handling user records'
    },
    info: {
      title: 'Microservice CRUD API Server',
      description: 'Powering Craft Turf\'s microservice projects',
      version: '0.0.1'
    }
  },
  swaggerUiOptions: {             // Swagger UI options
    title: 'My API',
    path: '/docs',
    swaggerOptions: {
      validatorUrl: null
    }
  },
});
```

## setting up environment variables
[node-convict](https://github.com/mozilla/node-convict) and [dotenv](https://github.com/motdotla/dotenv) are both used to manage application configuration. It is a requirement to create a file named `.env` at root of project and setup as follows:



```
# Application
PORT=4015
TLS_CERT=/path/to/server.crt
TLS_KEY=/path/to/server..key

# Either... MYSQL Database
MYSQL_USER=username
MYSQL_PASS=passwd
MYSQL_DB=mydb

# OR... Mongo Database
MONGO_DB=mydb
```

You can console log `process.env` to find out available environment variables. You can also inspect the imported `config` object from `@ctt/crud-api`.

## APIs

Details of each of the exposed APIs will now be explained.

### database connectors

```js
import { mysqlConnect, mongooseConnect, server } from '@ctt/crud-api';

server({
  ...
  dbConnect: mysqlConnect,   // Connect to db
  ...
});
```

Simply import either `mysqlConnect` (uses [knex](https://github.com/tgriesser/knex)) to connect to mysql database or `mongooseConnect` (uses [mongoose](https://github.com/Automattic/mongoose)) to connect to mongo database.

### schema

Depending on the choice of db connector, a schema/model will need to be implemented to query and manipulate the database.

```js
import schema from 'path/to/my/models';

server({
  ...
  schema,
  ...
});
```

The exported models are each expected to receive the `db` connector (client) as an argument, for example...

```js
import users from './User/queries';
import books from './Book/queries';

export default client => ({
  users: users(client),
  books: books(client),
});
```


### routes

[HapiJs](https://hapijs.com/tutorials/routing?lang=en_US) is the core building block of this module. All routing and handling of client requests are managed by handlers defined.

```js
import routes from 'path/to/my/routes';

server({
  ...
  routes,
  ...
});
```

Firstly, export all handlers of client requests, for example...

```js
import createUser, { destroyUser } from './users/routes';
import createBook from './books/routes';

export default () => ([
  createUser,
  destroyUser,
  createBook,
  ...
]);
```

Each route handler will receive in its arguments...

```js
export const createUser = ({
  services,     // Service response formatter
  config,       // Application configuration
  validate,     // joi validator
  uuid,         // universal unique id generator
  json,         // used by services to create HAL+JSON format resource response payload
}) => ({
  ...
});
```

Find out more about the passed in features:
- Application configuration using [convict](https://github.com/mozilla/node-convict)
- Object schema validation with [joi](https://github.com/hapijs/joi)
- A HAL+JSON resource object creator using [halson](https://github.com/seznam/halson)
- [uuid](https://github.com/kelektiv/node-uuid), a universal unique id generator


### plugins

Prior to routes, HapiJs custom plugins can be loaded. In the following example the [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2) plugin module is configured as follows:

```js
import hapiAuthJwt2 from 'hapi-auth-jwt2';

server({
  ...
  plugins: [{ plugin: hapiAuthJwt2, options: {} }],
  postRegisterHook: async app => {
    app.auth.strategy('jwt', 'jwt', {
      key: 'NeverShareYourSecret',
      validate: await validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    });
    
    app.auth.default('jwt');
  },
  ...
});
```
Notice the `postRegisterHook`, you can define a post plugin registration hook to be executed before the routes are loaded.

### services

`services` is the layer between the `router` and the `schema` layers. It's main responsibility is to pass on the `payload` from the `router` to the `schema`. It also creates the HAL+JSON format resource response payload coming from the `schema` layer.

Firstly define the services; For example...

```js
import users from './users/services';
import books from './books/services';

export default db => ({
  users: users(db),
    users: users(db),
    books: books(db),
    ...
});
```

Each `service` handler will receive in its arguments (passed down from `router`)...

```js
export const create = async ({
  db,         // db connector
  payload,    // request payload
  config,     // app config
  uuid,       // universal unique id generator
  json,       // used by services to create HAL+JSON format resource response payload
}) => {
  ...
};
```

### swagger

Automatically expose the API features using [hapi-swaggered](https://github.com/z0mt3c/hapi-swaggered) and [hapi-swaggered-ui](https://github.com/z0mt3c/hapi-swaggered-ui)

```js
server({
  ...
  swaggerOptions: {             // Swagger options
    tags: {
      'users': 'Operation for handling user records'
    },
    info: {
      title: 'Microservice CRUD API Server',
      description: 'Powering Craft Turf\'s microservice projects',
      version: '0.0.1'
    }
  },
  swaggerUiOptions: {             // Swagger UI options
    title: 'My API',
    path: '/docs',
    swaggerOptions: {
      validatorUrl: null
    }
  },
});
```

Ensure to add a `tag` to each route `options`...

```js
options: {
  ...
  tags: ['api'],
  ...
},
```
