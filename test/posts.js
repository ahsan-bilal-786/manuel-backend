const app = require('../app');
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JWT = require('jsonwebtoken');
const randomstring = require('randomstring');
const { expect } = chai;
chai.use(chaiHttp);

let user = null;

describe('User Profile and Pet Profile Posts', () => {
  before(async () => {
    const userPayload = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: true,
      verificationCode: randomstring.generate(),
    }
    let userResp = await chai
      .request(app)
      .post('/users/')
      .send(userPayload);
    user = userResp.body;
  })

  it('Create Event', async () => {

      const payload = {
        description: faker.lorem.words(),
        avatar: faker.image.imageUrl(),
        profileId: user.id,
        profileType: "user",
      }
      
      let resp = await chai
      .request(app)
      .post('/posts/')
      .set('Authorization', `bearer ${user.token}`)
      .send(payload);

      expect(resp.body.description).to.equals(payload.description);
      expect(resp.body.avatar).to.equals(payload.avatar);
      expect(resp.body.profileId).to.equals(payload.profileId);
      expect(resp.body.profileType).to.equals(payload.profileType);
      
  });

  it('Update Event', async () => {
      
    const createPayload = {
      description: faker.lorem.words(),
      avatar: faker.image.imageUrl(),
      profileId: user.id,
      profileType: "user",
    }

      let createResp = await chai
      .request(app)
      .post('/posts/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      const updatePayload = {
        ...createResp.body,
        description: faker.lorem.words(),
      }
      
      let updateResp = await chai
      .request(app)
      .put(`/posts/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send(updatePayload);


      expect(updateResp.body.description).to.equals(updatePayload.description);
      expect(updateResp.body.avatar).to.equals(createPayload.avatar);
      expect(updateResp.body.profileId).to.equals(createPayload.profileId);
      expect(updateResp.body.profileType).to.equals(createPayload.profileType);

  });

  it('Delete Event', async () => {
      
    const createPayload = {
      description: faker.lorem.words(),
      avatar: faker.image.imageUrl(),
      profileId: user.id,
      profileType: "user",
    }

      let createResp = await chai
      .request(app)
      .post('/posts/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      let resp = await chai
      .request(app)
      .delete(`/posts/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`);
      
      expect(resp.statusCode).to.equals(204);
  });


  it('Fetch Event', async () => {
      const createPayload = {
        description: faker.lorem.words(),
        avatar: faker.image.imageUrl(),
        profileId: user.id,
        profileType: "user",
      }

      let createResp = await chai
      .request(app)
      .post('/posts/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      let resp = await chai
      .request(app)
      .get(`/posts/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`);
      
      expect(resp.body.description).to.equals(createPayload.description);
      expect(resp.body.avatar).to.equals(createPayload.avatar);
      expect(resp.body.profileId).to.equals(createPayload.profileId);
      expect(resp.body.profileType).to.equals(createPayload.profileType);
      
  });


  it('Fetch Events List', async () => {

    let initResp = await chai
      .request(app)
      .get(`/posts/`)
      .set('Authorization', `bearer ${user.token}`);

    const createPayload = {
      description: faker.lorem.words(),
      avatar: faker.image.imageUrl(),
      profileId: user.id,
      profileType: "user",
    }

    let createResp = await chai
    .request(app)
    .post('/posts/')
    .set('Authorization', `bearer ${user.token}`)
    .send(createPayload);
      
    let updatedListResp = await chai
    .request(app)
    .get(`/posts/`)
    .set('Authorization', `bearer ${user.token}`);

    expect(updatedListResp.body.length).to.equals(++initResp.body.length);

  });
  
});
