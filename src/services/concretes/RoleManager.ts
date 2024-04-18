import { Role } from "../../entity/concretes/Role";
import { AppDataSource } from "../../data-source";
import { RoleService } from "../abstracts/RoleService";
import { checkRoleExistence, checkRolesExistence, checkRoleExistenceById } from "../rules/RoleBussinesRules";

export class RoleManager implements RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    async getAllRoles(): Promise<Role[]> {
        await checkRolesExistence(this.roleRepository);
        let roles = await this.roleRepository.find();
        return roles;
    }

    async getRoleById(id: number): Promise<Role | undefined> {
        await checkRoleExistenceById(this.roleRepository, id);
        return this.roleRepository.findOne({ where: { id } });
    }
    
    async createRole(roleData: Partial<Role>): Promise<Role> {
        await checkRoleExistence(this.roleRepository, roleData.name);
        const role = this.roleRepository.create(roleData);
        return this.roleRepository.save(role);
    }
    
    async updateRole(id: number, roleData: Partial<Role>): Promise<Role> {
        await checkRoleExistenceById(this.roleRepository, id);
        let roleToUpdate = await this.roleRepository.findOne({ where: { id } });
        Object.assign(roleToUpdate, roleData);
        return this.roleRepository.save(roleToUpdate);
    }

    async removeRole(id: number): Promise<void> {
        await checkRoleExistenceById(this.roleRepository, id);
        let roleToRemove = await this.roleRepository.findOne({ where: { id } });
        await this.roleRepository.remove(roleToRemove);
    }
}

export default RoleManager;
