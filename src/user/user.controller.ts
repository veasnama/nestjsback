import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser } from './decorator';
import { JwtGuard } from '../Auth/guard';
import { User } from '@prisma/client';
@Controller('users')
export class UserController {
  constructor(private Userservice: UserService) {}
  @Post('create')
  CreateUser(@Body() body: Request) {
    this.Userservice.CreateUser(body);
  }
  @UseGuards(JwtGuard)
  @Get('user')
  GetUser(@AuthUser() user: User) {
    return user;
  }
  @Post('remove')
  RemoveUser(@Body() body: Request) {
    this.Userservice.RemoveUser(body);
  }
  @Post('update')
  UpdateUser(@Body() body: Request) {
    this.Userservice.UpdateUser(body);
  }
  @Get('profile')
  UserProfile(@Query() query: Request) {
    this.UserProfile(query);
  }
}
