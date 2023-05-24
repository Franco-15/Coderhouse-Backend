import usersRepository from "../repositories/users.repository.js";

class UsersService {
    constructor() {}

    async getUsers() {
        try {
            const users = await usersRepository.getUsers();
            // Remove password from users
            const modifiedUsers = users.map((user) => {
                const { password, ...userWithoutPassword } = user._doc;
                return userWithoutPassword;
            });
            return modifiedUsers;
        } catch (error) {
            throw error;
        }
    }
}

export default new UsersService();
