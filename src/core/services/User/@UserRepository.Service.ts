import { Message } from "../../.shared/Interfaces";
import { User } from "../../models/User"

interface UserRepository {
    create(user: User): Promise<User>;
    getUsers(): Promise<User[]>
    deleteMany(): Promise<Message>
    isUniqueEmail(email: string): Promise<User | Message | null>
    findUserBy(searchFor: string): Promise<User | Message | null>
}

export { UserRepository }