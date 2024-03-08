import { Access } from "../../models/Access"

interface AccessRepository {
    create(access: Access): Promise<Access>
    getAccess(): Promise<Access[]>
    findUniqueAccess(name: string): Promise<Access | null>
}

export { AccessRepository }