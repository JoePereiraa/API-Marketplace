import { UseCase } from "../../.shared/UseCase"
import { Access } from "../../models/Access";
import { AccessRepository } from "./@AccessRepository.Service";

class GetAccessService implements UseCase<void, Access[]>{

    constructor(private readonly repository: AccessRepository){}

    async execute(request: void): Promise<Access[]> {
        const access = await this.repository.getAccess()

        if(access.length == 0) {
            throw new Error("Not found any access")
        }

        return access 
    }
}

export { GetAccessService }