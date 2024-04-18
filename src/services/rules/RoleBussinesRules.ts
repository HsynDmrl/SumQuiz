import { HTTPError } from "../../utils/globalExceptionHandler";
import { Role } from "../../entity/concretes/Role";

export async function checkRoleExistence(roleRepository: any, roleName: string) {
    const existingRole = await roleRepository.findOne({ where: { name: roleName } });
    if (existingRole) {
        const errorMessage = "Role with name " + roleName + " already exists!";
        throw new HTTPError(409, errorMessage);
    }
}

export async function checkRolesExistence(roleRepository: any) {
    const roles = await roleRepository.find();
    if (roles === undefined || !roles.length) {
        throw new HTTPError(404, "Roles not found");
    }
}

export async function checkRoleExistenceById(roleRepository: any, id: number) {
    const role = await roleRepository.findOne({ where: { id } });
    if (!role) {
        throw new HTTPError(404, "Role not found");
    }
}
