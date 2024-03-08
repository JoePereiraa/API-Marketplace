import { UserRepository } from "./@UserRepository.Service";
import { AccessRepository } from "../Access/@AccessRepository.Service";
import { UseCase } from "../../.shared/UseCase";
import { Message } from "../../.shared/Interfaces"
import { hash } from "bcryptjs"

type CreateUserProps = {
    name: string;
    email: string;
    password: string;
    accessName: string; 
}

class CreateUserService implements UseCase<CreateUserProps, Array<Object> | Message> {

    constructor(
        private readonly repository: UserRepository,
        private readonly accessRepository: AccessRepository
    ) {}

    async execute(request: CreateUserProps): Promise< Array<Object> | Message> {
        const { name, email, password, accessName } = request;
        const passwordHash = await hash(password, 8)

        {
            const userExists = await this.repository.isUniqueEmail(email);
            
            if(userExists) {
                const message: Message = {
                    text: `Error - User already exists`
                }
                return message
            }
        }

        {
            const accessExists = await this.accessRepository.findUniqueAccess(accessName)

            if(!accessExists) {
                const message: Message = {
                    text: `Error - This Nivel of access does not exist`
                }
                return message
            }
        }

        const message: Message = {
            text: `User created successfully`
        }

        const userCreate = await this.repository.create({ name, email, password: passwordHash, accessName });
        
        return [ userCreate, message ];
    }
}

export { CreateUserService };
