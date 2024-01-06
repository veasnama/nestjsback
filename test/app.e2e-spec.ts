import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { PrismaService } from './../src/prisma/prisma.service';
import { AuthDto } from 'src/Auth/dto';
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const testmod = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = testmod.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'veasna1@gmail.com',
      password: 'veasna38',
    };
    describe('signup', () => {
      it('it should throw error if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
    });
    describe('signup', () => {
      it('it should throw error if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
    });

    describe('signup', () => {
      it('it should throw error if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
    });

    describe('signup', () => {
      it('it should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('signin', () => {
      it('it should throw error if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
    });
    describe('signin', () => {
      it('it should throw error if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
    });

    describe('signin', () => {
      it('it should throw error if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
    });

    describe('signin', () => {
      it('it should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200);
      });
    });
  });
});
