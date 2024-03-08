import { Message } from "../../.shared/Interfaces";
import { UseCase } from "../../.shared/UseCase"
import { User } from "../../models/User";
import { UserRepository } from "./@UserRepository.Service";


class GetUsersService implements UseCase<void, User[] | Message>{

    constructor(private readonly repository: UserRepository){}

    async execute(request: void): Promise<User[] | Message> {
        const users = await this.repository.getUsers()

        if(users.length === 0) {
            const message: Message = {
                HTTPCode: 204,
                text: `Not found any user`
            }
            return message
        }

        return users 
    }
}

export { GetUsersService }