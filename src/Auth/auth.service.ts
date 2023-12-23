import { Injectable, Get, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  private readonly secretKey = 'DHAKDSHFKAHDFHAKSDJFH1231231231';

  async signup(dto: AuthDto) {
    // create a hash of password
    const hash = await argon2.hash(dto.password);
    // check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email already taken');
    }
    // create a user
    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .then((user) => {
        // user created successfully
        delete user.hash;
        return {
          msg: 'User created success',
          payload: user,
        };
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          // Handle specific prisma error
          console.error(error.message);
          return {
            error: error.message,
          };
        } else {
          // Handle generic error
          console.error(error);
        }
      });
    // return saved user
    return user;
  }
  async signin(dto: AuthDto) {
    // check if a user exist
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    console.log('user exists');
    if (!user) {
      throw new BadRequestException('Invalid credential');
    }
    const isValidPassword = await argon2.verify(user.hash, dto.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid credential');
    }
    const jwt = await this.jwtService.signAsync({ id: user.id });
    return {
      msg: 'signin success',
      token: jwt,
      user: user,
    };
  }
}
