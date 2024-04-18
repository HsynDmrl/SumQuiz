import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/concretes/User"
import { Role } from "./entity/concretes/Role"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "cornelius.db.elephantsql.com",
    port: 5432,
    username: "kywshfja",
    password: "C09A1uW-ex_CTXrlhWoMtqZrpEzupW4T",
    database: "kywshfja",
    synchronize: true,
    logging: false,
    entities: [User, Role],
    migrations: [],
    subscribers: [],
})
