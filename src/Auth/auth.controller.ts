import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private Authservice: AuthService) { }

  @Post('/signin')
  async Signin(@Body() dto: AuthDto) {
    const user = await this.Authservice.signin(dto);
    return user;
  }

  @Post('/signup')
  async Signup(@Body() dto: AuthDto) {
    const user = await this.Authservice.signup(dto);
    return user;
  }
}
