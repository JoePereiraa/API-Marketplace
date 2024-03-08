import { PrismaClient } from "@prisma/client";
import { Access } from "../../core/models/Access";
import { AccessRepository } from "../../core/services/Access/@AccessRepository.Service";

class _AccessRepositoryMySQL implements AccessRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(access: Access): Promise<Access> {
        return await this.prisma.access.create({
            data: access,
        });
    }

    getAccess(): Promise<Access[]> {
        return this.prisma.access.findMany();
    }

    findUniqueAccess(name: string): Promise<Access | null> {
        return this.prisma.access.findUnique({
            where: {
                name
            },
        })
    }
} 

export { _AccessRepositoryMySQL };
