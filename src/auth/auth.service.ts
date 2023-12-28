import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (private service: UsersService, private jwtService: JwtService) {}

    public async validateUser(email:string, password: string) : Promise<User> {
        const user = await this.service.getByEmail(email) // On récupère l'utilisateur ayant cet email
        if (user != undefined && await bcrypt.compare(password, user.password)) { // On vérifie que l'utilisateur existe et que c'est le bon mot de passe
            return user
        } else {
            return undefined
        }
    }

    async login(user:any) {
        const payload = {email : user.email, sub : user.id};
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
