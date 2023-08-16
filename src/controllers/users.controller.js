import usersService from "../services/users.service.js";

export async function getUsers(req, res) {
    try {
        const users = await usersService.getUsers();
        if (!users) {
            return res.status(404).send({
                status: "error",
                message: "Users not found",
            });
        }
        return res.send({ status: "Success", payload: users });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function getUserById(req, res) {
    const id = req.params.id;
    try {
        const user = await usersService.getUserById(id);
        if (!user) {
            res.status(404).send({
                status: "error",
                message: `Error getting user with id: ${id}`,
            });
        }
        res.status(200).send({
            status: "success",
            message: "User found successfully",
            user: user,
        });

    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function getUserByEmail(req, res) {
    const { email } = req.body;
    try {
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            res.status(404).send({
                status: "error",
                message: `Error getting user with email: ${email}`,
            });
        }
        res.status(200).send({
            status: "success",
            message: "User found successfully",
            user: user,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function addUser(req, res) {
    const user = req.body;
    try {
        const newUser = await usersService.addUser(user);
        if (!newUser) {
            res.status(400).send({
                status: "error",
                message: "Error to create user",
            })
        };
        res.status(201).send({
            status: "success",
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function updateUser(req, res) {
    const id = req.params.id;
    const user = req.body;

    try {
        const updatedUser = await usersService.updateUser(id, user);
        if (!updatedUser) {
            res.status(404).send({
                status: "error",
                message: "Not found user to update",
            })
        };
        res.status(200).send({
            status: "success",
            message: "User updated succesfully",
            payload: updatedUser,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function deleteUser(req, res) {
    const id = req.params.id;

    try {
        const userDeleted = await usersService.deleteUser(id);
        if (!userDeleted) {
            res.status(404).send({
                status: "error",
                message: "Not found user to delete",
            })
        };
        res.status(200).send({
            status: "success",
            message: "User removed succesfully",
        });
    } catch (error) {
        req.logger.error(error);
        res.status(error.status).send(error.message);
    }
}

export async function changeRole(req, res) {
    const user = req.user;
    let newRole;

    try {
        newRole = user.role === "user" ? "premium" : "user";
        const updatedUser = await usersService.updateUser(user.id, { role: newRole });
        if (!updatedUser) {
            res.status(404).send({
                status: "error",
                message: "Not found user to update",
            })
        }
        res.status(200).send({
            status: "success",
            message: "User updated succesfully",
            payload: updatedUser,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
};   
