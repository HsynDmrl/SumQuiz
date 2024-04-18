import { Role } from "../../entity/concretes/Role";

export interface RoleService {
    getAllRoles(): Promise<Role[]>;
    getRoleById(id: number): Promise<Role | undefined>;
    createRole(roleData: Partial<Role>): Promise<Role>;
    updateRole(id: number, roleData: Partial<Role>): Promise<Role>;
    removeRole(id: number): Promise<void>;
}
