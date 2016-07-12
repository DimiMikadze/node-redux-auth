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

export const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://dimitrimikadze.com:3000' : 'http://localhost:3000';
