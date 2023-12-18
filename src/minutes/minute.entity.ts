import { Association } from "src/associations/association.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Minute {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public date : string;

    @Column()
    public content: string;

    @ManyToMany( () => User, {eager:true})
    @JoinTable()
    public voters : User[];

    @ManyToOne(() => Association, {eager:true})
    @JoinColumn()
    public association : Association;
}