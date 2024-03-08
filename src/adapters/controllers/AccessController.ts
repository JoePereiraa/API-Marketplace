import { Request, Response } from "express"
import { _AccessRepositoryMySQL } from "../../external/prisma/Access.Repository";

//Services
import { CreateAccessService } from "../../core/services/Access/CreateAccess";
import { GetAccessService } from "../../core/services/Access/GetAccess";

//Connection
const connectAccessRepository = new _AccessRepositoryMySQL()

//Create
const CreateAccessController = async (req: Request, reply: Response) => {
    type CreateAccessProps = {
        name: string;
    }

    try {
        const accessProps = req.body as CreateAccessProps;

        const access = await new CreateAccessService(connectAccessRepository).execute(accessProps);

        return reply.status(201).json(access);
    } catch (error) {
        console.error("Error creating access:", error);
        return reply.status(500).json({ error: "Internal Server Error" });
    }
};

//Read All
const GetAccessController = async (req: Request, reply: Response) => {
    try {
        const access = await new GetAccessService(connectAccessRepository).execute();
        return reply.status(200).json(access)
    } catch (error) {
        console.error(`Error getting access: ${error}`)
        return reply.status(500).json({ error: "Internal Server Error" });
    }
}


export { CreateAccessController, GetAccessController }