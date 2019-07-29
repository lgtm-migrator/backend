/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../data/db';

const { expect } = chai;

chai.use(chaiHttp);

describe('Auth Routes', () => {
  beforeEach((done) => {
    db('users')
      .truncate()
      .then(() => done());
  });

  it('creates a user and return user details', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'easybuoys',
        email: 'eze@gmail.com',
        name: 'Ezekiel Ekunola',
        password: '123456',
        type: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User registered successfully');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('return validation error if no data is sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')

      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('error');
        expect(res.body.errors.email).to.equal('Email field is required');
        expect(res.body.errors.password).to.equal('Password field is required');
        expect(res.body.errors.name).to.equal('Name field is required');
        expect(res.body.errors.type).to.equal('Type field is required');
        done();
      });
  });

  it('return email already exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'easybuoys',
        email: 'eze@gmail.com',
        name: 'Ezekiel Ekunola',
        password: '123456',
        type: '1',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('User registered successfully');
        expect(res.body.status).to.equal('success');

        chai
          .request(app)
          .post('/api/v1/auth/register')
          .send({
            username: 'easybuoys',
            email: 'eze@gmail.com',
            name: 'Ezekiel Ekunola',
            password: '123456',
            type: '1',
          })
          .end((err2, res2) => {
            expect(res2).to.have.status(409);
            expect(res2.body).to.be.an('object');
            expect(res2.body.status).to.equal('error');
            expect(res2.body.message).to.equal('Username already taken');
            done();
          });
      });
  });

  //   it('return token', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'example@gmail.com',
  //         password: '123456',
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.status).to.equal('success');
  //         expect(res.body.data.token).to.include('Bearer');
  //         done();
  //       });
  //   });

  //   it('return validation error if no data is sent', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/login')
  //       .end((err, res) => {
  //         expect(res).to.have.status(400);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.data.email).to.equal('Email field is required');
  //         expect(res.body.data.password).to.equal('Password field is required');
  //         done();
  //       });
  //   });

  //   it('return user not found', (done) => {
  //     chai
  //       .request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'example232@gmail.com',
  //         password: '123456',
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(404);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.data.email).to.equal('User Not Found');
  //         done();
  //       });
  //   });

  //   it('return user not found error', (done) => {
  //     chai
  //       .request(app)
  //       .get('/api/v1/auth/attendants')
  //       .set('Authorization', storeownertoken)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body.data).to.be.an('array');
  //         let { id } = res.body.data[0];
  //         id = id.substring(2);
  //         id = `93${id}`;
  //         chai
  //           .request(app)
  //           .get(`/api/v1/auth/${id}`)
  //           .set('Authorization', storeownertoken)
  //           .end((error, data) => {
  //             expect(data).to.have.status(400);
  //             expect(data.body).to.be.an('object');
  //             expect(data.body.message).to.equal(`User with id ${id} not found.`);
  //             done();
  //           });
  //       });
  //   });

  //   it('return error fetching user error', (done) => {
  //     chai
  //       .request(app)
  //       .get('/api/v1/auth/attendants')
  //       .set('Authorization', storeownertoken)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body.data).to.be.an('array');
  //         let { id } = res.body.data[0];
  //         id = `93${id}`;
  //         chai
  //           .request(app)
  //           .get(`/api/v1/auth/${id}`)
  //           .set('Authorization', storeownertoken)
  //           .end((error, data) => {
  //             expect(data).to.have.status(400);
  //             expect(data.body).to.be.an('object');
  //             expect(data.body.message).to.equal(
  //               'Error Fetching User Details, Please try again',
  //             );
  //             done();
  //           });
  //       });
  //   });
});
