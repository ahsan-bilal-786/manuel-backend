##### Prerequisiste

- [node](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install/)
- [postgres](https://www.postgresql.org/download/)
- [pgadmin](https://www.pgadmin.org/download/)
- [sequelize-cli](https://sequelize.org/master/manual/migrations.html#installing-the-cli)

## Getting Started

In order to get started, you'll need to do a few things first.

1. Install all of the `node_modules` required for the package. Depending on the computer's configuration, you may need to prefix this command with a `sudo`.

```
npm install
```

or

```
sudo npm install
```

`yarn` can be used it is already installed

```
yarn install
```

or

```
sudo yarn install
```

2. To setup the database, install the sequelize-cli and run all the migrations by using the below steps. [https://sequelize.org/master/manual/migrations.html](https://sequelize.org/master/manual/migrations.html)

- Installing the CLI > npm install --save-dev sequelize-cli
- For db configuration, please add the db credentials in the following file (https://github.com/ahsan-bilal-786/manuel-backend/blob/master/config/config.json)
- To migrate all the migrations of app please use the command
  `> npx sequelize-cli db:migrate`

```
npx sequelize-cli db:migrate
```

2. Create `.env` environment file by making a duplicate of the `.env-example` and remove the `-example`. In the `.env` file, set the `AUTH_SECRET_KEY` for the jwt token encryption, `SMTP_EMAIL` & `SMTP_PASSWORD` to use SMTP services to send the verification email to users.

```
AUTH_SECRET_KEY=zdoi-=*(&(%#$@!$^*(8wee7eu
SMTP_EMAIL=*********
SMTP_PASSWORD=*********
```

3. Lastly, run the start command to get the project off the ground.

```
npm dev
```

or

```
yarn dev
```

4. Head over to [http://0.0.0.0:3001](http://0.0.0.0:3001) to see the app live!

5. The application has been developed by using the test driven development method. So, the unit test of each feature has been implemented and is present in
   [https://github.com/ahsan-bilal-786/manuel-backend/blob/master/test/users.js](https://github.com/ahsan-bilal-786/manuel-backend/blob/master/test/users.js)

To run the unit test and to make sure about the application setup please use the below command to run tests

```
yarn test
```

6. Please use the network path (192.168.**_._**:3001) of your system to access the backend API through react-native app. usually react-native app does not access the backend API through localhost (127.0.0.1:3001)
