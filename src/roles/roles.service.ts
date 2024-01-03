import { Injectable } from '@nestjs/common';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

    constructor (
        private usersService: UsersService,
        private associationsService: AssociationsService,
        @InjectRepository(Role)
        private repository: Repository<Role>
    ) {}

   async getAll(): Promise<Role[]> {
        return await this.repository.find();
    } 

    async getById(idUserToFind:number, idAssociationToFind:number): Promise<Role> {
        return await this.repository.findOne({where: {idUser: idUserToFind, idAssociation: idAssociationToFind}});
    }

    async create(nameToAdd:string, idUserToAdd:number, idAssociationToAdd:number): Promise<Role> {
        const userToAdd = await this.usersService.getById(idUserToAdd)
        const associationToAdd = await this.associationsService.getById(idAssociationToAdd)
        const role = await this.repository.create({
            name : nameToAdd,
            user : userToAdd,
            association: associationToAdd});
        return this.repository.save(role);
    }

    async update(idUserToUpdate:number, idAssociationToUpdate:number, name:string) : Promise<Role> {
        const role = await this.getById(idUserToUpdate, idAssociationToUpdate)
        if (role !== undefined) { // si l'association ayant cet id existe, on modifie les éléments fournis
            role.name = name
        }
        this.repository.save(role);
        //console.log(`le rôle ${role.name} a été attribué à l'utilisateur  ${idUserToUpdate} dans l'association ${idUserToUpdate}`)
        return role;
    }
    
    async deletion(idUserToFind:number, idAssociationToFind) : Promise<void> {
        const userOfRoleToDelete = await this.usersService.getById(idUserToFind)
        const associationOfRoleToDelete = await this.associationsService.getById(idAssociationToFind)
        await this.repository.delete({user: userOfRoleToDelete, association: associationOfRoleToDelete});
    }
}
