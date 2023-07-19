import userModel from "./models/user.model.js";
import Exception from "../../exceptions.js";

class User {
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

export const user = new User();