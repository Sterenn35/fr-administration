import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Role {

    @Column()
    public name : string;

    @ManyToOne(() => User, {eager:true, onDelete: "CASCADE"})
    @JoinColumn({name: 'idUser', referencedColumnName: 'id'})
    public user : User;

    @ManyToOne(() => Association, {eager:true, onDelete: "CASCADE"})
    @JoinColumn({name: 'idAssociation', referencedColumnName: 'id'})
    public association : Association;

    @PrimaryColumn()
    public idUser: number

    @PrimaryColumn()
    public idAssociation: number
}