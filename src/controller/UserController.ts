import { Request, Response } from "express";
import { UserService } from "../services/abstracts/UserService";
import UserManager from "../services/concretes/UserManager";

export class UserController {
    private userService: UserService = new UserManager();

    async all(_, response: Response) {
        try {
            response.status(200).json(await this.userService.getAllUsers());
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
            response.status(200).json(await this.userService.getUserById(parseInt(request.params.id)));
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
            response.status(201).json(await this.userService.createUser(request.body));
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
            await this.userService.updateUser(parseInt(request.params.id), request.body);
            response.status(200).send({ message: "User has been updated" });
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
            await this.userService.removeUser(parseInt(request.params.id));
            response.status(200).send({ message: "User has been deleted" });
        } catch (error) {
            if (error.statusCode === 404) {
                response.status(404).json({ message: error.message });
            } else {
                response.status(500).json({ message: error.message });
            }
        }
    }    
}
