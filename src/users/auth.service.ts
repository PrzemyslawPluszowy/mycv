

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { IsEmail } from 'class-validator';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userSeervice: UsersService) {

    }
    async singUp(email: string, password: string) {
        const checkEmail = await this.userSeervice.findByEmail(email);
        if (checkEmail.length !== 0) {
            throw new BadRequestException('Email already exists');
        }
        const salt = await randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');
        const user = await this.userSeervice.create(email, result);
        return user;
    }

    async signIn(email: string, password: string) {
        const [user] = await this.userSeervice.findByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash === hash.toString('hex')) {
            return user;
        } else {
            throw new BadRequestException('Bad password');
        }



    }
}