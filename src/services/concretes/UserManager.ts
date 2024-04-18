import { User } from "../../entity/concretes/User";
import { AppDataSource } from "../../data-source";
import { UserService } from "../abstracts/UserService";
import { checkUserExistence, checkUsersExistence, checkUserExistenceById } from "../rules/UserBussinesRules";
import { checkRoleExistenceById } from "../rules/RoleBussinesRules";
import { Role } from "../../entity/concretes/Role";

export class UserManager implements UserService {
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role);

    async getAllUsers(): Promise<User[]> {
        await checkUsersExistence(this.userRepository);
        const users = await this.userRepository.find({ relations: ["roles"] }); // Include roles in the query
        return users;
    }

    async getUserById(id: number): Promise<User | undefined> {
        await checkUserExistenceById(this.userRepository, id);
        const user = await this.userRepository.findOne({ where: { id }, relations: ["roles"] });
        return user;
    }
    
    async createUser(userData: Partial<User>): Promise<User> {
        await checkUserExistence(this.userRepository, userData.email);
        await checkRoleExistenceById(this.roleRepository, userData.roles[0].id);
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async updateUser(id: number, userData: Partial<User>): Promise<User> {
        await checkUserExistenceById(this.userRepository, id);
        let userToUpdate = await this.userRepository.findOne({ where: { id }, relations: ["roles"] });
        await checkRoleExistenceById(this.roleRepository, userData.roles[0].id);
        Object.assign(userToUpdate, userData);
        return this.userRepository.save(userToUpdate);
    }

    async removeUser(id: number): Promise<void> {
        const userToRemove = await this.userRepository.findOne({ where: { id } });
        userToRemove.roles = [];
        await this.userRepository.save(userToRemove);
        await this.userRepository.remove(userToRemove);
    }
}

export default UserManager;
