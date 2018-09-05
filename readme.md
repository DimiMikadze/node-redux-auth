# Token authentication system using Node, Mongo, React, Redux

## Features

- Signin, Signup, Email verification, Password reset
- Client side forms validation
- Node/Express rest api
- Nodemailer configuration, Email templates
- Webpack configuration for server and client
- SCSS configuration
- Linting with Airbnb eslint configuration

## Screenshot

![Screenshot](/client/static/images/screenshot.png)

## Getting Started

Clone Repo

````
git clone https://github.com/DimiMikadze/node-redux-auth.git
````

# Server

npm install dependencies

````
cd node-redux-auth/server

npm install
````

Create index.js file inside src/config folder.

example index.js:

````
export const dbConfig = {
  secret: 'SomeRandomSecretString',
  db: 'mongodb://localhost:auth/auth',
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'reduxauth@gmail.com',
    pass: 'Password',
  },
};

export const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://dimimikadze.com:3000' : 'http://localhost:3000';

````

Start Mongodb

````
mongod
````

# Client

npm install dependencies

````
cd node-redux-auth/client

npm install
````

Commands
--------

Open the terminal and go to the folder server/ and run `npm run dev`. The server is gonna start and listen in the port 3333.

Open a new terminal and go to the folder client/ and run `npm run dev`. The client is gonna start and listen in the port 3000.

The client is reachable on `localhost:3000/reduxauth`.

|Script|Description|
|---|---|
|`npm run dev`| Run development server |
|`npm run dev`| Run development client |
|`npm run build`| build the application to `./dist`|
|`npm start`| Start production server with pm2 from `./dist`|

### Contributing

contributions are welcome!

### License

MIT
