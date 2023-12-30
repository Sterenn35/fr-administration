import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Association {

    @PrimaryGeneratedColumn()
    id : number
    @Column()
    name : string
    @ManyToMany(() => User, {eager:true})
    @JoinTable()
    users : User[]
    @Column()
    description:string
}