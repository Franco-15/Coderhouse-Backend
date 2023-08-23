import { usersRepository } from "../repositories/index.js";
import DTOUSer from "../dao/dto/user.dto.js";
import { createHash } from "../utils/utils.js";

class UsersService {
    constructor() { }

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

    async getUserById(id) {
        try {
            const user = await usersRepository.getUserById(id);
            return new DTOUSer(user).getUser();
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await usersRepository.getUserByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async addUser(user) {
        try {
            const newUser = await usersRepository.addUser(user);
            return newUser;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, user) {
        try {

            if (user.password) {
                const userGetted = await usersRepository.getUserById(id);
                user.password = createHash(user.password);
                if (user.password === userGetted.password) {
                    throw new Exception(400, {
                        status: "error",
                        message: "Password is the same",
                    });
                }
            }
            const userUpdated = await usersRepository.updateUser(id, user);
            return userUpdated;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const userDeleted = await usersRepository.deleteUser(id);
            return userDeleted;
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersService();
