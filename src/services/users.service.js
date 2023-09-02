import { usersRepository } from "../repositories/index.js";
import DTOUSer from "../dao/dto/user.dto.js";
import { createHash } from "../utils/utils.js";
import { sendMail } from "../utils/email.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const { jwtSecret } = config;

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

    async deleteInactiveUsers() {
        try {
            const users = await this.getUsers();
            const currentDate = new Date();
            const lastTwoDays = new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000);

            const inactiveUsers = users.filter((user) => {
                if (user.role != "admin" && user.last_connection.getTime() <= lastTwoDays)
                    return user;
            });
            const userDeleted = await usersRepository.deleteInactiveUsers(inactiveUsers);
            if (!userDeleted) {
                throw new Exception(400, {
                    status: "error",
                    message: "Error deleting inactive users",
                });
            }
            inactiveUsers.forEach((user) => {
                sendMail({
                    to: user.email,
                    subject: "Eliminacion De Usuario",
                    html: `
                          <div>
                            <h1>Ecommerce de Bebidas</h1>
                            <p>Su usuario ha sido eliminado por inactividad</p>
                          </div>
                          `,
                  });
            });
            return userDeleted;
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

    decodeUserFromToken(token) {
        try {
            const decoded = jwt.verify(token, jwtSecret, { ignoreExpiration: true });
            return decoded;
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersService();
