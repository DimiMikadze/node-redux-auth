# Token authentication system using Node, Mongo, React, Redux

## Features

- Node/Express rest api
- client side form validation
- Email verification
- Password reset
- Webpack configuration for server and client
- Linting with Airbnb eslint configuration

## Getting Started

Clone Repo

````
git clone https://github.com/DimitriMikadze/node-redux-auth.git
````

## Server

npm install dependencies

````
cd node-redux-auth/server

npm install
````

Create config index.js file inside src/config folder.

example:

````
export const dbConfig = {
  secret: 'SomeRandomSecretString',
  db: 'mongodb://localhost:auth/auth',
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'email@gmail.com',
    pass: 'Password',
  },
};

````

Start Mongodb

````
mongod
````

Commands
--------

|Script|Description|
|---|---|
|`npm run dev`| Run development server |
|`npm run build`| build the application to `./dist`|
|`npm start`| Start production server with pm2 from `./dist`|

## Client

npm install dependencies

````
cd node-redux-auth/client

npm install
````

Commands
--------

|Script|Description|
|---|---|
|`npm run dev`| Run development server |
|`npm run build`| build the application to `./dist`|
|`npm start`| Start production server with pm2 from `./dist`|

### Contributing

contributions are welcome!

### License

MIT