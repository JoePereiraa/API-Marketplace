import { User } from "../../models/User";
import { Message } from "../../.shared/Interfaces";
import { UseCase } from "../../.shared/UseCase";
import { UserRepository } from "./@UserRepository.Service";

class FindOneService implements UseCase<string, User | Message | null>{

    constructor(private readonly repository: UserRepository){}
    async execute(searchFor: string): Promise< User | Message | null> {
        return await this.repository.findUserBy(searchFor)
    }
}

export { FindOneService }