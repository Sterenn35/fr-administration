import { Injectable } from '@nestjs/common';
import { Minute } from './minute.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociationsService } from 'src/associations/associations.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class MinutesService {
    constructor (
        private associationsService: AssociationsService,
        private usersService: UsersService,
        @InjectRepository(Minute)
        private repository: Repository<Minute>
    ) {}

   async getAll(): Promise<Minute[]> {
        return await this.repository.find();
    } 

    async getById(idToFind:number): Promise<Minute> {
        return await this.repository.findOne({where: {id: Equal(idToFind)}});
    }

    async create(dateToCreate: string, contentToCreate: string, idOfVotersToAdd:number[], idOfAssociationToAdd:number): Promise<Minute> {
        const minute = await this.repository.create({date : dateToCreate, content : contentToCreate});
        const voters = (await this.usersService.getAll()).filter((voter => idOfVotersToAdd.indexOf(voter.id) >= 0));
        const members = await this.associationsService.getMembers(idOfAssociationToAdd);
        console.log("members okay");
        for (const voter of voters) { // On vérifie que les votants sont membres de l'association
          console.log(voter);
          console.log(members);
          console.log(members.indexOf(voter));
          if (members.indexOf(voter) == -1) { // NE MARCHE PAS ??
            console.log("Le votant n'est pas membre de l'association");
            return undefined;
          }
        }
        minute.voters = voters // On récupère les votants
        minute.association = (await this.associationsService.getById(idOfAssociationToAdd)); // On récupère l'association
        return this.repository.save(minute);
    }

    async update(idToUpdate:number, dateToUpdate: string, contentToUpdate: string, idvotersToUpdate:number[], idOfAssociationToUpdate: number) : Promise<Minute> {
        const minute = await this.repository.findOne({where : {id: Equal(idToUpdate)}})
        if (minute !== undefined) { // si la minute ayant cet id existe, on modifie les éléments fournis
            if (idvotersToUpdate !== undefined) {
                minute.voters = [] // On réinitialise le tableau de users
                const members = await this.associationsService.getMembers(idOfAssociationToUpdate) // On récupère les membres
                for (let i : number = 0; i < idvotersToUpdate.length; i++) {
                    const voter = await this.usersService.getById(idvotersToUpdate[i]); // On récupère le votant
                    if (!members.includes(voter)) return undefined; // erreur ==> le votant n'est pas un membre de l'association
                    else minute.voters.push()
                }
            }
            if (dateToUpdate !== undefined) {
                minute.date = dateToUpdate
            }
            if (contentToUpdate !== undefined) {
                minute.content = contentToUpdate
            }
            if (idOfAssociationToUpdate !== undefined) {
                const association = await this.associationsService.getById(idOfAssociationToUpdate);
                if (association !== undefined) minute.association = association
            }
        }
        return minute;
    }
    
    async deletion(idToFind:number) : Promise<void> {
        await this.repository.delete(idToFind);
    }
}
