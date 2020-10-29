const app = require('../app');
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');
const JWT = require('jsonwebtoken');
const randomstring = require('randomstring');
const { expect } = chai;
chai.use(chaiHttp);

let user = null;
let pet = null;

describe('Calendar Events', () => {
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


    const petPayload = {
        name: faker.name.firstName(),
        avatar: faker.image.imageUrl(),
        height: faker.random.float(),
        weight: faker.random.float(),
        dob: faker.date.past(),
        petType: faker.random.arrayElement(["cats","dogs","birds","rabbits","guinea pigs","fish"]),
      }
      let petResp = await chai
      .request(app)
      .post('/pets/')
      .set('Authorization', `bearer ${user.token}`)
      .send(petPayload);

      pet = petResp.body;

  })
  it('Create Event', async () => {

      const payload = {
        title: faker.lorem.words(),
        startTime: faker.date.past(),
        endTime: faker.date.past(),
        petId: pet.id
      }
      
      let resp = await chai
      .request(app)
      .post('/events/')
      .set('Authorization', `bearer ${user.token}`)
      .send(payload);

      expect(resp.body.userId).to.equals(user.id);
      expect(resp.body.title).to.equals(payload.title);
      expect(resp.body.petId).to.equals(payload.petId);
      
  });

  it('Update Event', async () => {
      
    const createPayload = {
      title: faker.lorem.words(),
      startTime: faker.date.past(),
      endTime: faker.date.past(),
      petId: pet.id
    }

      let createResp = await chai
      .request(app)
      .post('/events/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      const updatePayload = {
        ...createResp.body,
        title: faker.lorem.words(),
      }
      
      let updateResp = await chai
      .request(app)
      .put(`/events/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`)
      .send(updatePayload);

      expect(updateResp.body.userId).to.equals(user.id);
      expect(updateResp.body.title).to.equals(updatePayload.title);
      expect(updateResp.body.petId).to.equals(createPayload.petId);
  });

  it('Delete Event', async () => {
      
    const createPayload = {
      title: faker.lorem.words(),
      startTime: faker.date.past(),
      endTime: faker.date.past(),
      petId: pet.id
    }

      let createResp = await chai
      .request(app)
      .post('/events/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      let resp = await chai
      .request(app)
      .delete(`/events/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`);
      
      expect(resp.statusCode).to.equals(204);
  });


  it('Fetch Event', async () => {
      const createPayload = {
        title: faker.lorem.words(),
        startTime: faker.date.past(),
        endTime: faker.date.past(),
        petId: pet.id
      }

      let createResp = await chai
      .request(app)
      .post('/events/')
      .set('Authorization', `bearer ${user.token}`)
      .send(createPayload);
      
      let resp = await chai
      .request(app)
      .get(`/events/${createResp.body.id}`)
      .set('Authorization', `bearer ${user.token}`);
      
      expect(resp.body.userId).to.equals(user.id);
      expect(resp.body.title).to.equals(createPayload.title);
      expect(resp.body.petId).to.equals(createPayload.petId);
      
  });


  it('Fetch Events List', async () => {

    let initResp = await chai
      .request(app)
      .get(`/events/`)
      .set('Authorization', `bearer ${user.token}`);

    const createPayload = {
      title: faker.lorem.words(),
      startTime: faker.date.past(),
      endTime: faker.date.past(),
      petId: pet.id
    }

    let createResp = await chai
    .request(app)
    .post('/events/')
    .set('Authorization', `bearer ${user.token}`)
    .send(createPayload);
      
    let updatedListResp = await chai
    .request(app)
    .get(`/events/`)
    .set('Authorization', `bearer ${user.token}`);
    expect(updatedListResp.body.length).to.equals(++initResp.body.length);
  });
  
});
