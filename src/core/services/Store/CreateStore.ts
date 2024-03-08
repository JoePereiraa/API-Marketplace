import { Store } from "../../models/Store";
import { Message } from "../../.shared/Interfaces";
import { UseCase } from "../../.shared/UseCase";

//Repositories
import { StoreRepository } from "./@StoreRepositoryInterface";
import { UserRepository } from "../User/@UserRepository.Service";

type CreateStoreProps = {
    name: string;
    userId: string;
}

class CreateStoreService implements UseCase<CreateStoreProps, Store | Message> {

    constructor(
        private readonly repository: StoreRepository,
        private readonly userRepository: UserRepository
    ){}

    async execute(data: CreateStoreProps): Promise<Store | Message > {
        const { name, userId } = data

        const userFind = await this.userRepository.findUserBy(userId)

        if(!userFind) {
            const message: Message = {
                HTTPCode: 204,
                text: `Not found any user with this parameters`
            }
            return message
        }

        return await this.repository.create({ name, userId }) 
    }
}

export { CreateStoreService }