import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (private service: UsersService, private jwtService: JwtService) {}
    public async validateUser(id: number, password: string) : Promise<User> {
        const user = await this.service.getById(id) // On récupère l'utilisateur ayant cet id
        if (user != undefined && bcrypt.compare(password, user.password)) {
            return user
        } else {
            return undefined
        }
    }

    async login(user:any) {
        const payload = {username:user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
