import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User]),],
  controllers: [UsersController],
  providers: [AuthService, UsersService, { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor }],
  exports: [UsersService],

})
export class UsersModule { }
