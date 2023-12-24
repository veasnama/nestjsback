import { Injectable, Get, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService
  ) { }
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
        return user;
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
    // user created successfully
    return {
      msg: 'User created success',
      payload: user,
    };
  }
  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }
    const jwt = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('SUPER_SECRET')
    }
    );
    return { access_token: jwt }
  }
  @HttpCode(HttpStatus.OK)
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
    return this.signToken(user.id, user.email);
  }
}
