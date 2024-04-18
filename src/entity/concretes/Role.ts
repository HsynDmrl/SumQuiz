import { Entity, Column, ManyToOne } from "typeorm"
import { BaseEntity } from "../abstracts/BaseEntity"
import { User } from "./User"

@Entity()
export class Role extends BaseEntity{

    @Column()
    name: string

    @ManyToOne(() => User, user => user.roles)
    user: User;
}
