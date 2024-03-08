import { PrismaClient } from "@prisma/client";
import { Store } from "../../core/models/Store";
import { StoreRepository } from "../../core/services/Store/@StoreRepositoryInterface";

class _StoreRepositoryMySQL implements StoreRepository {
    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient();
    }
    async create(store: Store): Promise<Store> {
        type CreateStoreProps = {
            name: string;
            userId: string;
        }

        const { name, userId } = store as CreateStoreProps
        return await this.prisma.store.create({ 
            data: { 
                name,
                User: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    getAllStores(): Promise<Store[]> {
        return this.prisma.store.findMany()
    }
}

export { _StoreRepositoryMySQL }