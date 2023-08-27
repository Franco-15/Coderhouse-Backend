export default class UsersRepository {
    constructor(persistence) {
        this.persistence = persistence
    }

    async getUsers(){
        try {
            const users = await this.persistence.getUsers();
            return users;
        } catch (error) {
            throw error;
        }
    };

    async getUserById(id) {
        try {
            return await this.persistence.getUserById(id);
        } catch (error) {
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            return await this.persistence.getUserByEmail(email);
        } catch (error) {
            throw error;
        }
    }

    async addUSer(user) {
        try {
            return await this.persistence.addUSer(user);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id, user) {
        try {
            return await this.persistence.updateUser(id, user);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            return await this.persistence.deleteUser(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteInactiveUsers(inactiveUsers) {
        try {
            return await this.persistence.deleteInactiveUsers(inactiveUsers);
        } catch (error) {
            throw error;
        }
    }
}