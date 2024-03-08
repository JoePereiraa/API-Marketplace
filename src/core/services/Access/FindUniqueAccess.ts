import { UseCase } from "../../.shared/UseCase";
import { Access } from "../../models/Access";
import { AccessRepository } from "./@AccessRepository.Service";


class FindUniqueAccessService implements UseCase<string, Access | null> {

    constructor(private readonly repository: AccessRepository) {}
    execute(name: string): Promise<Access | null> {
        return this.repository.findUniqueAccess(name)
    }
}

export { FindUniqueAccessService }
