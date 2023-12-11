import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Minute {

    @Column()
    public date : string;

    @Column()
    public content: string;
    
    @ManyToOne( () => Association, {eager:true})
    @JoinColumn({name: 'idAssociation', referencedColumnName: 'id'})
    public association : Association;

    @PrimaryColumn()
    public idUser: number

    @PrimaryColumn()
    public idAssociation: number
}