
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
}