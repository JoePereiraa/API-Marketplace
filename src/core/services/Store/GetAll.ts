import { Store } from "../../models/Store";
import { Message } from "../../.shared/Interfaces";
import { UseCase } from "../../.shared/UseCase";
import { StoreRepository } from "./@StoreRepositoryInterface";

class GetAllStoresService implements UseCase<void, Store[] | Message> {
    constructor(private readonly repository: StoreRepository){}
    async execute(request: void): Promise< Store[] | Message> {

        const stores = await this.repository.getAllStores()

        if(stores.length === 0) {
            const message: Message = {
                HTTPCode: 204,
                text: `Not found any store`
            }
            return message
        }

        return stores
    }
}

export { GetAllStoresService }