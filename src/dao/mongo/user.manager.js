import userModel from "./models/user.model.js";
import Exception from "../../exceptions.js";

class UserManager {
    constructor() {}
    async getUsers(){
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error getting users",
            });
        }
    };
}

export const userManager = new UserManager();