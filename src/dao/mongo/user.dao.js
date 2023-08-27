import userModel from "./models/user.model.js";
import Exception from "../../exceptions.js";

class User {
    constructor() { }
    async getUsers() {
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

    async getUserById(id) {
        try {
            const user = await userModel.findOne({ _id: id });
            return user;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error getting user",
            });
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await userModel.findOne({ email: email });
            return user;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error getting user",
            });
        }
    }

    async addUser(user) {
        try {
            const userAdded = await userModel.create(user);
            return userAdded;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error adding user",
            });
        }
    }

    async updateUser(id, user) {
        try {
            let userUpdated = null;
            if (user.documents) {
                userUpdated = await userModel.updateOne(
                    { _id: id },
                    { $push: { documents: user.documents } }
                );
            } else {
                userUpdated = await userModel.updateOne(
                    { _id: id },
                    { $set: user }
                );
            }
            return userUpdated;    
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: "Error updating user",
            });
        }
    }

    async deleteUser(id) {
        try {
            const userDeleted = await productsModel.deleteOne({ _id: id });
            return userDeleted;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }

    async deleteInactiveUsers(inactiveUsers) {
        try {
            const userDeleted = await userModel.deleteMany({ email: { $in: inactiveUsers.map(user => user.email) }});
            return userDeleted;
        } catch (error) {
            throw new Exception(500, {
                status: "error",
                message: error.message,
            });
        }
    }

}

export const user = new User();