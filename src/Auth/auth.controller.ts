import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private Authservice: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async Signin(@Body() dto: AuthDto) {
    const user = await this.Authservice.signin(dto);
    return user;
  }

  @Post('signup')
  async Signup(@Body() dto: AuthDto) {
    const user = await this.Authservice.signup(dto);
    return user;
  }
}
