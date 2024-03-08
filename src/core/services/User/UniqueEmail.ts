import { Message } from "../../.shared/Interfaces";
import { UseCase } from "../../.shared/UseCase";
import { User } from "../../models/User";
import { UserRepository } from "./@UserRepository.Service";


class UserUniqueEmailService implements UseCase<string, User | Message | null> {

    constructor(private readonly repository: UserRepository) {}
    async execute(email: string): Promise<User | Message | null> {
        return this.repository.isUniqueEmail(email)
    }
}