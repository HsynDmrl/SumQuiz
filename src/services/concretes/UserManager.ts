import { User } from "../../entity/User";
import { AppDataSource } from "../../data-source";
import { UserService } from "../abstracts/UserService";
import {checkUserExistence, checkUsersExistence, checkUserExistenceById } from "../rules/UserBussinesRules";

export class UserManager implements UserService {
    private userRepository = AppDataSource.getRepository(User);

    async getAllUsers(): Promise<User[]> {
        await checkUsersExistence(this.userRepository);
        let users = await this.userRepository.find();
        return users;
    }

    async getUserById(id: number): Promise<User | undefined> {
        await checkUserExistenceById(this.userRepository, id);
        return this.userRepository.findOne({ where: { id } });
    }
    
    async createUser(userData: Partial<User>): Promise<User> {
        await checkUserExistence(this.userRepository, userData.email);
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    
    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        await checkUserExistenceById(this.userRepository, id);
        let userToUpdate = await this.userRepository.findOne({ where: { id } });
        Object.assign(userToUpdate, userData);
        return this.userRepository.save(userToUpdate);
    }

    async removeUser(id: number): Promise<void> {
        await checkUserExistenceById(this.userRepository, id);
        let userToRemove = await this.userRepository.findOne({ where: { id } });
        await this.userRepository.remove(userToRemove);
    }
}

export default UserManager; 