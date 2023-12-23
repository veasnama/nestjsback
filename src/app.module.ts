import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './Auth/auth.service';
import { AuthController } from './Auth/auth.controller';
import { UserModule } from './user/user.module';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    UserModule,
    BookmarkModule,
    PrismaModule,
    JwtModule.register({
      secret: 'DHAKDSHFKAHDFHAKSDJFH1231231231',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, BookmarkService, PrismaService],
})
export class AppModule {}
