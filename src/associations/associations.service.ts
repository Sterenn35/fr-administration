import { Injectable } from '@nestjs/common';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class AssociationsService {

    constructor (
        private service: UsersService,
        @InjectRepository(Association)
        private repository: Repository<Association>
    ) {}

   async getAll(): Promise<Association[]> {
        return await this.repository.find();
    } 

    async getById(idToFind:number): Promise<Association> {
        return await this.repository.findOne({where: {id: Equal(idToFind)}});
    }

    async getMembers(id:number): Promise<User[]> {
        const association = await this.getById(id) // on récupère l'association
        if (association === undefined) {
            return undefined;
        }
        else {return association.users;
        }
    }

    async create(idOfUsersToAdd:number[], descriptionToCreate:string, nameToCreate:string): Promise<Association> {
        const association = await this.repository.create({
            name : nameToCreate,
            description : descriptionToCreate,
            users : []});
        association.users = (await this.service.getAll()).filter((user => idOfUsersToAdd.indexOf(user.id) >= 0))
        return this.repository.save(association);
    }

    async update(idToUpdate:number, idUsers:number[], description: string, name:string) : Promise<Association> {
        const association = await this.repository.findOne({where : {id: Equal(idToUpdate)}})
        console.log(association)
        if (association !== undefined) { // si l'association ayant cet id existe, on modifie les éléments fournis
            if (idUsers !== undefined) {
                    association.users = [] // On réinitialise le tableau de users
                for (let i : number = 0; i < idUsers.length; i++) {
                    association.users.push(await this.service.getById(idUsers[i]))
                }
            }
            if (name !== undefined) {
                association.name = name;
            }
            if (description !== undefined) {
                association.description = description
            }
        }
        this.repository.save(association);
        return association;
    }
    
    async deletion(idToFind:number) : Promise<void> {
        await this.repository.delete(idToFind);
    }
}
