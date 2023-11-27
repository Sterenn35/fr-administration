import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    async getAll(): Promise<User[]> {
        return await this.repository.find();
    } 
    async getById(idToFind: number): Promise<User> {
        return await this.repository.findOne({where: {id: Equal(idToFind)}});
    }

    async create(lastnameToCreate:string, firstnameToCreate:string, ageToCreate:number): Promise<User> {
        const user = await this.repository.create({
            lastname: lastnameToCreate, 
            firstname: firstnameToCreate, 
            age: ageToCreate 
        })
        this.repository.save(user);
        return user;
    }

    async update(idToFind:number, lastname:string, firstname:string, age:number) : Promise<User> {
        const user = await this.repository.findOne({where: {id: Equal(idToFind)}});
        if (user !== undefined) { // si l'utilisateur ayant cet id existe, on modifie les éléments fournis 
            if (lastname !== undefined) {
                user.lastname = lastname;
            }
            if (firstname !== undefined) {
                user.firstname = firstname;
            }
        }
        return user;
    }
    
    async deletion(id:number) : Promise<void> {
        await this.repository.delete(id); // on retire l'utilisateur 
    }
    
}
