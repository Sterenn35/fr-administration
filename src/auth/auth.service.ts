import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private service: UsersService;
    public async validateUser(id: number, password: string) : Promise<User> {
        const user = await this.service.getById(+id) // On récupère l'utilisateur ayant cet id
        if (user.password === password){
            return user
        } else return undefined
    }
}
