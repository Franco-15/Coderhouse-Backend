import usersService from "../services/users.service.js";

export async function getUsers(req, res) {
    try {
        const users = await usersService.getUsers();
        return res.send({ status: "Success", payload: users });
    } catch (error) {
        return res.status(error.status).send(error.message);
    }
}
