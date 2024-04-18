import { User } from "../../entity/concretes/User";

export interface UserService {
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | undefined>;
    createUser(userData: Partial<User>): Promise<User>;
    updateUser(id: number, userData: Partial<User>): Promise<User>;
    removeUser(id: number): Promise<void>;
}
