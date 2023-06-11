import { usersRepository } from "../repositories/index.js";
import DTOUSer from "../dao/dto/user.dto.js";

class UsersService {
    constructor() {}

    async getUsers() {
        try {
            const users = await usersRepository.getUsers();
            // Remove password from users
            const modifiedUsers = users.map((user) => {
                return new DTOUSer(user).getUser();
            });
            return modifiedUsers;
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersService();
