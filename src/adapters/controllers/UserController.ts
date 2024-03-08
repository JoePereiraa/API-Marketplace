import { Request, Response } from "express"
import { _UserRepositoryMySQL } from "../../external/prisma/User.Repository"

//Services
import { CreateUserService } from "../../core/services/User/CreateUser"
import { GetUsersService } from "../../core/services/User/GetUsers";
import { DeleteUsersService } from "../../core/services/User/DeleteMany";
import { _AccessRepositoryMySQL } from "../../external/prisma/Access.Repository";

//Connection
const connectUserRepository = new _UserRepositoryMySQL()
const connectAccessRepository = new _AccessRepositoryMySQL()

//Create
const CreateUserController = async (req: Request, reply: Response) => {
    type CreateUserProps = {
        name: string;
        email: string;
        password: string;
        accessName: string;
    }

    try {
        const { name, email, password, accessName } = req.body as CreateUserProps;

        const user = await new CreateUserService(connectUserRepository, connectAccessRepository).execute({ name, email, password, accessName });

        return reply.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return reply.status(500).json({ error: "Internal Server Error" });
    }
};

//Read All
const GetUsersController = async (req: Request, reply: Response) => {
    try {
        const usersOrMessage = await new GetUsersService(connectUserRepository).execute();

        return reply.status(200).json(usersOrMessage);
    } catch (error) {
        console.error(`Error getting users: ${error}`)
        return reply.status(500).json({ error: "Internal Server Error" });
    }
}

//Delete All
const DeleteUsersController = async (req: Request, reply: Response) => {
    try {
        const message = await new DeleteUsersService(connectUserRepository).execute();
        return reply.status(200).json(message);
    } catch (error) {
        console.error(`Error delete users: ${error}`)
        return reply.status(500).json({ error: "Internal Server Error" });
    }
}

export { CreateUserController, GetUsersController, DeleteUsersController }