import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('auth')
@Serialize(UserDto)


export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Get('/whoami')
    @UseGuards(AuthGuard)

    async whoami(@CurrentUser() user: User) {
        return user

    }

    @Post('/signout')
    async signOut(@Session() session: any) {
        session.userId = null;
        return;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.singUp(body.email, body.password);
        session.userId = user.id;
        return user;

    }
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/users')
    getAllUsers() {
        return this.userService.findAll();
    }


    @Get('/:id')
    async findUser(@Param('id') id: string) {

        const user = await this.userService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Patch('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(parseInt(id), body);
    }
    @Serialize(UserDto)

    @Get()
    findByEmail(@Query('email') email: string) {
        return this.userService.findByEmail(email);
    }
    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        return await this.userService.remove(parseInt(id));
    }


}

