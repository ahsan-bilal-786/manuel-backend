const app = require("../app");
const faker = require("faker");
const chai = require("chai");
const chaiHttp = require("chai-http");
const JWT = require("jsonwebtoken");
const { hashPassword } = require("../helpers/auth");
const { User } = require("../models");

const { expect } = chai;
chai.use(chaiHttp);

describe("Users", () => {
  it("Create Users", (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
    };
    chai
      .request(app)
      .post("/users/")
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

  it("User Duplication Error on create user", (done) => {
    const data = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
    };
    User.create(data).then(() => {
      chai
        .request(app)
        .post("/users/")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.message).to.equals(
            "A user has already registered with this email."
          );
          done();
        });
    });
  });

  it("User Authentication", async () => {
    const password = faker.internet.password();
    const encryptedPassword = await hashPassword(password);
    const userPayload = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: encryptedPassword,
      contact: faker.phone.phoneNumber(),
      avatar: faker.image.imageUrl(),
    };
    const authPayload = {
      email: userPayload.email,
      password,
    };
    User.create(userPayload).then(() => {
      chai
        .request(app)
        .post("/users/login")
        .send(authPayload)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equals(userPayload.name);
          expect(res.body.email).to.equals(userPayload.email);
          expect(res.body.contact).to.equals(userPayload.contact);
          expect(res.body.avatar).to.equals(userPayload.avatar);
        });
    });
  });
});
