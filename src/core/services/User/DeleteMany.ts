import { Message } from "../../.shared/Interfaces";
import { UseCase } from "../../.shared/UseCase"
import { User } from "../../models/User";
import { UserRepository } from "./@UserRepository.Service";

class DeleteUsersService implements UseCase<void, Message | null>{
    constructor(private readonly repository: UserRepository){}

    async execute(request: void): Promise<Message | null> {
        const deleteUsers = await this.repository.deleteMany()

        if(deleteUsers) {
            const message: Message = {
                text: `Users deleted successfully`
            }
            
            return message
        }

        const message: Message = {
            text: `Error deleting users`
        }

        return message
    }
}

export { DeleteUsersService }