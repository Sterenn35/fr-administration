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

    async getMinutesByIdAsso(idAssociation: number): Promise<Minute[]> {
        const association = await this.associationsService.getById(idAssociation);
        if (association === undefined) {
          return undefined; 
        } else {
          const minutes = (await this.getAll()).filter((asso => idAssociation === asso.association.id));
          return minutes;
        }
      }

    async create(dateToCreate: string, contentToCreate: string, idOfVotersToAdd:number[], idOfAssociationToAdd:number): Promise<Minute> {
        const voters = (await this.usersService.getAll()).filter((voter => idOfVotersToAdd.indexOf(voter.id) >= 0));
        const members = await this.associationsService.getMembers(idOfAssociationToAdd);
        if (voters.length === 0) return undefined; // si le ou les utilisateur(s) n'existe(nt) pas
        for (const voter of voters) { // On vérifie que les votants sont membres de l'association
          if (members.findIndex(member => voter.id === member.id) === -1){
            console.log("Le votant n'est pas membre de l'association");
            return undefined;
          }
        }
        const minute = await this.repository.create({date : dateToCreate, content : contentToCreate, voters: voters});
        minute.voters = voters // On récupère les votants
        minute.association = (await this.associationsService.getById(idOfAssociationToAdd)); // On récupère l'association
        return this.repository.save(minute);
    }

    async update(idToUpdate:number, dateToUpdate: string, contentToUpdate: string, idvotersToUpdate:number[], idOfAssociationToUpdate: number) : Promise<Minute> {
        const minute = await this.repository.findOne({where : {id: Equal(idToUpdate)}})
        if (minute !== null) { // si la minute ayant cet id existe, on modifie les éléments fournis
            if (idOfAssociationToUpdate !== undefined) {
                const association = await this.associationsService.getById(idOfAssociationToUpdate);
                if (association !== null) minute.association = association
            }
            if (idvotersToUpdate !== undefined) {
                minute.voters = [] // On réinitialise le tableau de users
                console.log("affectation des votants");
                const members = await this.associationsService.getMembers(minute.association.id) // On récupère les membres
                console.log("association trouvée")
                for (let i : number = 0; i < idvotersToUpdate.length; i++) {
                    const voter = await this.usersService.getById(idvotersToUpdate[i]); // On récupère le votant
                    if (members.findIndex(member => voter.id === member.id) === -1) {
                        return undefined; // erreur ==> le votant n'est pas un membre de l'association
                    }
                    else minute.voters.push(voter);
                }
            }
            if (dateToUpdate !== undefined) {
                minute.date = dateToUpdate
            }
            if (contentToUpdate !== undefined) {
                minute.content = contentToUpdate
            }
            
        }
        console.log(minute);
        this.repository.save(minute);
        return minute;
    }
    
    async deletion(idToFind:number) : Promise<void> {
        await this.repository.delete(idToFind);
    }
}
