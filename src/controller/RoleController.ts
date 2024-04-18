import { Request, Response } from "express";
import { RoleService } from "../services/abstracts/RoleService";
import RoleManager from "../services/concretes/RoleManager";

export class RoleController {
    private roleService: RoleService = new RoleManager();

    async all(_, response: Response) {
        try {
            response.status(200).json(await this.roleService.getAllRoles());
        }
        catch (error) {
            if (error.statusCode === 404) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    async one(request: Request, response: Response) {
        try {
            response.status(200).json(await this.roleService.getRoleById(parseInt(request.params.id)));
        }
        catch (error) {
            if (error.statusCode === 404) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }
    
    async save(request: Request, response: Response) {
        try {
            response.status(201).json(await this.roleService.createRole(request.body));
        } catch (error) {
            if (error.statusCode === 409) {
                response.status(409).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    async update(request: Request, response: Response) {
        try {
            await this.roleService.updateRole(parseInt(request.params.id), request.body);
            response.status(200).send({ message: "Role has been updated" });
        } catch (error) {
            if (error.statusCode === 404) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }

    async remove(request: Request, response: Response) {
        try {
            await this.roleService.removeRole(parseInt(request.params.id));
            response.status(200).send({ message: "Role has been deleted" });
        } catch (error) {
            if (error.statusCode === 404) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }    
}
