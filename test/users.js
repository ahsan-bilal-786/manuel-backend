const app = require('../app');
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JWT = require('jsonwebtoken');
const randomstring = require('randomstring');
const { User } = require('../models');

const { expect } = chai;
chai.use(chaiHttp);

describe('Users', () => {
  it('Create Users', (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: false,
      verificationCode: randomstring.generate(),
    };
    chai
      .request(app)
      .post('/users/')
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(201);
        const decoded = JWT.verify(res.body.token, process.env.AUTH_SECRET_KEY);
        expect(res.body.id).to.equals(decoded.sub);
        expect(res.body.name).to.equals(data.name);
        expect(res.body.email).to.equals(data.email);
        expect(res.body.contact).to.equals(data.contact);
        expect(res.body.avatar).to.equals(data.avatar);
        done();
      });
  });

  it('User Duplication Error on create user', (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: false,
      verificationCode: randomstring.generate(),
    };
    User.create(data).then(() => {
      chai
        .request(app)
        .post('/users/')
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equals(
            'A user has already registered with this email.'
          );
          done();
        });
    });
  });

  it('User Authentication', (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: false,
    };
    const agent = chai.request.agent(app);
    agent
      .post('/users/')
      .send(data)
      .then(() => {
        agent
          .post('/users/login')
          .send({ email: data.email, password: data.password })
          .then((res2) => {
            expect(res2).to.have.status(200);
            done();
          });
      });
  });

  it('Verify Users', (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: false,
      verificationCode: randomstring.generate(),
    };
    const agent = chai.request.agent(app);
    agent
      .post('/users/')
      .send(data)
      .then((res) => {
        return User.findOne({ where: { id: res.body.id } }).then((data) => {
          return {
            token: `bearer ${res.body.token}`,
            verificationCode: data.verificationCode,
          };
        });
      })
      .then((payload) => {
        agent
          .post('/users/verify')
          .set('Authorization', payload.token)
          .send({ verificationCode: payload.verificationCode })
          .then((res2) => {
            expect(res2).to.have.status(200);
            done();
          });
      });
  });
  it('Get Loggedin User Profile', (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: false,
      verificationCode: randomstring.generate(),
    };
    const agent = chai.request.agent(app);
    agent
      .post('/users/')
      .send(data)
      .then((res) => {
        agent
          .get('/users/')
          .set('Authorization', `bearer ${res.body.token}`)
          .then((res2) => {
            expect(res2).to.have.status(200);
            done();
          });
      });
  });
});
