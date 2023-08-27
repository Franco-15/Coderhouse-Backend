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
            return res.status(404).send({
                status: "error",
                message: `Error getting user with id: ${id}`,
            });
        }
        return res.status(200).send({
            status: "success",
            message: "User found successfully",
            user: user,
        });

    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function getUserByEmail(req, res) {
    const { email } = req.body;
    try {
        const user = await usersService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: `Error getting user with email: ${email}`,
            });
        }
        return res.status(200).send({
            status: "success",
            message: "User found successfully",
            user: user,
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function addUser(req, res) {
    const user = req.body;
    try {
        const newUser = await usersService.addUser(user);
        if (!newUser) {
            return res.status(400).send({
                status: "error",
                message: "Error to create user",
            })
        };
        return res.status(201).send({
            status: "success",
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function updateUser(req, res) {
    const id = req.params.id;
    const user = req.body;

    try {
        const updatedUser = await usersService.updateUser(id, user);
        if (!updatedUser) {
            return res.status(404).send({
                status: "error",
                message: "Not found user to update",
            })
        };
        return res.status(200).send({
            status: "success",
            message: "User updated succesfully",
            payload: updatedUser,
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function deleteUser(req, res) {
    const id = req.params.id;

    try {
        const userDeleted = await usersService.deleteUser(id);
        if (!userDeleted) {
            return res.status(404).send({
                status: "error",
                message: "Not found user to delete",
            })
        };
        return res.status(200).send({
            status: "success",
            message: "User removed succesfully",
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function deleteInactiveUsers(req, res) {

    try {
        const usersDeleted = await usersService.deleteInactiveUsers();
        if (!usersDeleted) {
            return res.status(404).send({
                status: "error",
                message: "Not found users to delete",
            })
        };
        return res.status(200).send({
            status: "success",
            message: "Inactive Users removed succesfully",
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}

export async function changeRole(req, res) {
    const {user} = req.user;
    const {role: newRole} = req.body;
    try {

        const gettedUser = await usersService.getUserById(user.id);
        if (!gettedUser) {
            return res.status(404).send({
                status: "error",
                message: "Not found user to update",
            })
        }
        const documents = gettedUser.documents;
        if (documents.length < 3 && (gettedUser.role === "user" || gettedUser.role === "premium")) {
            return res.status(400).send({
                status: "error",
                message: "Debe cargar todos los documentos para cambiar de rol",
            })
        }
        if(newRole === gettedUser.role){
            return res.status(400).send({
                status: "error",
                message: "Ya tienes este rol",
            })
        }

        const updatedUser = await usersService.updateUser(user.id, { role: newRole });
        if (!updatedUser) {
            return res.status(404).send({
                status: "error",
                message: "Not found user to update",
            })
        }
        return res.status(200).send({
            status: "success",
            message: "User updated succesfully",
            payload: updatedUser,
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
};

export async function loadFiles(req, res) {
    const { user } = req.user;
    const { identification, direction, accountStatus } = req.files;
    let docName, docPath;

    if (identification) {
        docName = identification[0].filename;
        docPath = identification[0].path;
    }
    else if (direction) {
        docName = direction[0].filename;
        docPath = direction[0].path;
    }
    else if (accountStatus) {
        docName = accountStatus[0].filename;
        docPath = accountStatus[0].path;
    }

    try {
        const updatedUser = await usersService.updateUser(user.id, { documents: { name: docName, reference: docPath } });
        if (!updatedUser) {
            return res.status(404).send({
                status: "error",
                message: "Not found user to update",
            })
        }
        return res.status(200).send({
            status: "success",
            message: "User updated succesfully",
        });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}