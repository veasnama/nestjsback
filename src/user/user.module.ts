import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from '../Auth/strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
