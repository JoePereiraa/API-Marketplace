import { AccessRepository } from "./@AccessRepository.Service";
import { UseCase } from "../../.shared/UseCase";
import { Access } from "../../models/Access";
import { Message } from "../../.shared/Interfaces"

type CreateAccessProps = {
    name: string;
}

class CreateAccessService implements UseCase<CreateAccessProps, Message> {

    constructor(private readonly repository: AccessRepository) {}

    async execute(request: CreateAccessProps): Promise<Message> {
        const { name } = request;

        const accessExists = await this.repository.findUniqueAccess(name)

        if(accessExists) {
            const message: Message = {
                text: `Error - Access already exists`
            }
            return message
        }

        await this.repository.create({ name });

        const message: Message = {
            text: `Access created successfully`
        }

        return message;
    }
}

export { CreateAccessService };
