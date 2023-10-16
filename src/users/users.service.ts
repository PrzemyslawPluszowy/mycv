import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({ id });
        if (!user) {
            throw new
                NotFoundException('user not found');
        }
        return await this.repo.remove(user);
    }

    async findOne(id: number) {
        if (!id) {
            return null;
        }
        return await this.repo.findOneBy({ id });
    }

    async findAll() {
        return await this.repo.find();
    }

    findByEmail(email: string) {
        return this.repo.findBy({ email });
    }


    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({ id })
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    };



}



