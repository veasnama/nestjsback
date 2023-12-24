import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const testmod = await Test.createTestingModule({
      imports: [
        AppModule
      ]
    }).compile()
    app = testmod.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true
      })
    )
    await app.init()

  })
  afterAll(() => {
    app.close()
  })
  it.todo('It should run')
});
