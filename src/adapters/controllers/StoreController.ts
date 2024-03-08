import { Request, Response } from "express";
import { CreateStoreService } from "../../core/services/Store/CreateStore";
import { _StoreRepositoryMySQL } from "../../external/prisma/Store.Repository";
import { _UserRepositoryMySQL } from "../../external/prisma/User.Repository";
import { GetAllStoresService } from "../../core/services/Store/GetAll";

const connectStoreRepository = new _StoreRepositoryMySQL
const connectUserRepository = new _UserRepositoryMySQL

const CreateStoreController = async (req: Request, reply: Response) => {
    type CreateStoreProps = {
        name: string;
        userId: string;
    }
    try {
        const { name } = req.body as CreateStoreProps; 
        const { userId } = req.params as CreateStoreProps;

        const store = await new CreateStoreService(connectStoreRepository, connectUserRepository).execute({ name, userId });

        return reply.status(201).json(store);
    } catch (error) {
        console.error("Error creating store:", error);
        return reply.status(500).json({ error: "Internal Server Error" });
    }
}

const ReadAllController = async (req: Request, reply: Response) => {
    try {
        const stores = await new GetAllStoresService(connectStoreRepository).execute()

        return reply.status(200).json(stores)
    } catch (error) {
        console.error(`Error getting stores: ${error}`)
        return reply.status(500).json({ error: "Internal Server Error" });
    }
}

export { CreateStoreController, ReadAllController }