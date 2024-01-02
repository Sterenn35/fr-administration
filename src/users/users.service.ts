import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


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

    async getByEmail(emailToFind: string): Promise<User> {
        return await this.repository.findOne({where: {email: emailToFind}});
    }


    async create(firstnameToCreate:string, lastnameToCreate:string, ageToCreate:number, passwordToCreate:string, emailToCreate:string): Promise<User> {
        const userExist = await this.getByEmail(emailToCreate); 
        if (userExist === null) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(passwordToCreate, saltOrRounds);
            const user = await this.repository.create({
                lastname: lastnameToCreate, 
                firstname: firstnameToCreate, 
                age: ageToCreate,
                password: hash,
                email:emailToCreate
            })
        this.repository.save(user);
        return user;
        } else { // L'utilisateur existe déjà
            return undefined; 
        }
    }

    async update(idToFind:number, lastname:string, firstname:string, age:number, password:string, email:string) : Promise<User> {
        const user = await this.repository.findOne({where: {id: Equal(idToFind)}});
        if (user !== undefined) { // si l'utilisateur ayant cet id existe, on modifie les éléments fournis 
            if (lastname !== undefined) {
                user.lastname = lastname;
            }
            if (firstname !== undefined) {
                user.firstname = firstname;
            } 
            if (age !== undefined) {
                user.age = age;
            }
            if (password !== undefined) {
                const saltOrRounds = 10;
                const hash = await bcrypt.hash(password, saltOrRounds);
                user.password = hash
            }
            if (email != undefined) {
                user.email = email
            }
        }
        this.repository.save(user);
        return user;
    }
    
    async deletion(id:number) : Promise<void> {        
        await this.repository.delete(id); // on retire l'utilisateur 
    }
    
}
