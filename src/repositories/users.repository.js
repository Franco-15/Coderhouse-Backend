import UserManager from "../dao/mongo/user.manager.js";

class UsersRepository {
    constructor() {
        this.userManager = new UserManager();
    }

    async getUsers(){
        try {
            const users = await this.userManager.getUsers();
            return users;
        } catch (error) {
            throw error;
        }
    };
}

export default new UsersRepository();
