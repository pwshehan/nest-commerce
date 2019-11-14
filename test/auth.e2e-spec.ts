import 'dotenv/config';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { RegisterDTO, LoginDTO } from '../src/auth/auth.dto';
import { HttpStatus } from '@nestjs/common';
import { app } from './constsnts';

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://sheindav:SPW5342118@cluster0-h6hxw.mongodb.net/nest-commerce?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {

  const user: RegisterDTO | LoginDTO = {
    username: 'username',
    password: 'password'
  };

  const userWrong: LoginDTO = {
    username: 'WrongUsername',
    password: 'WrongPassword'
  };

  const sellerRegister: RegisterDTO = {
    username: 'seller',
    password: 'sellerpassword',
    seller: true
  };

  const sellerLogin: LoginDTO = {
    username: 'seller',
    password: 'sellerpassword'
  };

  let userToken: string;
  let sellerToken: string;

  it('should register', () => {
    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({ body }) => {
      expect(body.token).toBeDefined();
      expect(body.user.username).toEqual('username');
      expect(body.user.password).toBeUndefined();
      expect(body.user.seller).toBeFalsy();
    })
    .expect(HttpStatus.CREATED)
  });

  it('should register seller', () => {
    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(sellerRegister)
    .expect(({ body }) => {
      expect(body.token).toBeDefined();
      expect(body.user.username).toEqual('seller');
      expect(body.user.password).toBeUndefined();
      expect(body.user.seller).toBeTruthy();
    })
    .expect(HttpStatus.CREATED)
  });

  it('should reject duplicate registration', () => {
    return request(app)
    .post('/auth/register')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({ body }) => {
      expect(body.message).toEqual('User already exists');
    })
    .expect(HttpStatus.BAD_REQUEST)
  });

  it('should login user', () => {
    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send(user)
    .expect(({ body }) => {
      expect(body.token).toBeDefined();
      expect(body.user.username).toEqual('username');
      expect(body.user.password).toBeUndefined();
      expect(body.user.seller).toBeFalsy();
    })
    .expect(HttpStatus.CREATED)
  });

  it('should login seller', () => {
    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send(sellerLogin)
    .expect(({ body }) => {
      expect(body.token).toBeDefined();
      expect(body.user.username).toEqual('seller');
      expect(body.user.password).toBeUndefined();
      expect(body.user.seller).toBeTruthy();
    })
    .expect(HttpStatus.CREATED)
  });

  it('should reject wrong credentials in login', () => {
    return request(app)
    .post('/auth/login')
    .set('Accept', 'application/json')
    .send(userWrong)
    .expect(({ body }) => {
      expect(body.token).toBeUndefined();
      expect(body.message).toEqual('Invalid credentials');
    })
    .expect(HttpStatus.UNAUTHORIZED)
  });
});

