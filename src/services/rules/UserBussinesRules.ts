import { HTTPError } from "../../utils/globalExceptionHandler";

export async function checkUserExistence(userRepository: any, email: string) {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
        const errorMessage = "User with email " + email + " already exists!";
        throw new HTTPError(409, errorMessage);
    }
}

export async function checkUsersExistence(userRepository: any) {
    const users = await userRepository.find();
    if (users === undefined || !users.length) {
        throw new HTTPError(404, "Users not found");
    }
}

export async function checkUserExistenceById(userRepository: any, id: number) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        throw new HTTPError(404, "User not found");
    }
}

