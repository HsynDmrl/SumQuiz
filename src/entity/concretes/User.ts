import { Entity, Column, OneToMany, JoinTable } from "typeorm"
import { BaseEntity } from "../abstracts/BaseEntity"
import { Role } from "./Role"

@Entity()
export class User extends BaseEntity{

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    dateOfBirth: Date

    @OneToMany(() => Role, role => role.user)
    @JoinTable()
    roles: Role[];
}
