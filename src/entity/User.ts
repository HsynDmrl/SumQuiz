import { Entity, Column } from "typeorm"
import { BaseEntity } from "./BaseEntity"

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

}
