const app = require('../app');
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JWT = require('jsonwebtoken');
const randomstring = require('randomstring');
const { expect } = chai;
chai.use(chaiHttp);

let user = null;

describe('Pets', () => {
  before(async () => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
      isVerified: true,
      verificationCode: randomstring.generate(),
    }
    let resp = await chai
      .request(app)
      .post('/users/')
      .send(data);
    user = resp.body;
  })
  it('Create Pet', async () => {
      const data = {
        name: faker.name.firstName(),
        avatar: faker.image.imageUrl(),
        height: faker.random.float(),
        weight: faker.random.float(),
        dob: faker.date.past(),
        petType: faker.random.arrayElement(["cats","dogs","birds","rabbits","guinea pigs","fish"]),
      }
      let resp = await chai
      .request(app)
      .post('/pets/')
      .set('Authorization', `bearer ${user.token}`)
      .send(data);
      expect(resp.body.userId).to.equals(user.id);
      expect(resp.body.name).to.equals(data.name);
      expect(resp.body.avatar).to.equals(data.avatar);
      expect(resp.body.height).to.equals(data.height);
      expect(resp.body.weight).to.equals(data.weight);
      expect(resp.body.petType).to.equals(data.petType);
  });

  it('Update Pet', async () => {
      const createPayload = {
        name: faker.name.firstName(),
        avatar: faker.image.imageUrl(),
        height: faker.random.float(),
        weight: faker.random.float(),
        dob: faker.date.past(),
        petType: faker.random.arrayElement(["cats","dogs","birds","rabbits","guinea pigs","fish"]),
      }
      let createResp = await chai
      .request(app)
      .post('/pets/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      const updatePayload = {
        ...createResp.body,
        height: faker.random.float(),
      }
      
      let updateResp = await chai
      .request(app)
      .put(`/pets/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send(updatePayload);
      expect(updateResp.body.height).to.equals(updatePayload.height);
      expect(createResp.body.userId).to.equals(user.id);
      expect(createResp.body.name).to.equals(updatePayload.name);
      expect(createResp.body.avatar).to.equals(updatePayload.avatar);
      expect(createResp.body.weight).to.equals(updatePayload.weight);
      expect(createResp.body.petType).to.equals(updatePayload.petType);
  });

  it('Delete Pet', async () => {
      const createPayload = {
        name: faker.name.firstName(),
        avatar: faker.image.imageUrl(),
        height: faker.random.float(),
        weight: faker.random.float(),
        dob: faker.date.past(),
        petType: faker.random.arrayElement(["cats","dogs","birds","rabbits","guinea pigs","fish"]),
      }
      let createResp = await chai
      .request(app)
      .post('/pets/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      let resp = await chai
      .request(app)
      .delete(`/pets/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`);
      
      expect(resp.statusCode).to.equals(204);
  });


  it('Fetch Pet Profile', async () => {
      const createPayload = {
        name: faker.name.firstName(),
        avatar: faker.image.imageUrl(),
        height: faker.random.float(),
        weight: faker.random.float(),
        dob: faker.date.past(),
        petType: faker.random.arrayElement(["cats","dogs","birds","rabbits","guinea pigs","fish"]),
      }
      let createResp = await chai
      .request(app)
      .post('/pets/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      let resp = await chai
      .request(app)
      .get(`/pets/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`);
      
      expect(resp.body.userId).to.equals(user.id);
      expect(resp.body.height).to.equals(createPayload.height);
      expect(resp.body.name).to.equals(createPayload.name);
      expect(resp.body.avatar).to.equals(createPayload.avatar);
      expect(resp.body.weight).to.equals(createPayload.weight);
      expect(resp.body.petType).to.equals(createPayload.petType);
  });


  it('Fetch Pets List', async () => {
    let initResp = await chai
      .request(app)
      .get(`/pets/`)
      .set('Authorization', `bearer ${user.token}`);
    const createPayload = {
      name: faker.name.firstName(),
      avatar: faker.image.imageUrl(),
      height: faker.random.float(),
      weight: faker.random.float(),
      dob: faker.date.past(),
      petType: faker.random.arrayElement(["cats","dogs","birds","rabbits","guinea pigs","fish"]),
    }
    let createResp = await chai
    .request(app)
    .post('/pets/')
    .set('Authorization', `bearer ${user.token}`)
    .send(createPayload);
      
    let updatedListResp = await chai
    .request(app)
    .get(`/pets/`)
    .set('Authorization', `bearer ${user.token}`);
    expect(updatedListResp.body.length).to.equals(++initResp.body.length);
  });
  
});
