import userModel from "../models/user.model.js";
import Exception from "../../exceptions.js";

export default class UserManager {
    constructor() {}
    getUsers = async () => {
        try {
            const users = await userModel.find();
            return users;
        } catch (error) {
            throw new Exception(500, error);
        }
    };
}
