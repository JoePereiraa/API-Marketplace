import { PrismaClient } from "@prisma/client";
import { User } from "../../core/models/User";
import { UserRepository } from "../../core/services/User/@UserRepository.Service";

type UserWithoutPassword = Omit<User, 'password'>;

class _UserRepositoryMySQL implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(user: User): Promise<User> {
        const { name, email, password, accessName } = user

        return await this.prisma.user.create({
            data: { 
                name, 
                email, 
                password, 
                Access: {
                    connect: {
                        name: accessName
                    }
                } 
            },
            // select: {
            //     id: true,
            //     name: true,
            //     email: true,
            //     Access: {
            //         select: {
            //             name: true
            //         }
            //     }
            // } 
        });
    }

    getUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    
    isUniqueEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email
            },
        })
    }

    
    findUserBy(searchFor: string): Promise<User | null> {
        let queryCondition

        if(searchFor.includes('@')) {
            queryCondition = {
                email: searchFor
            }
        } else {
            queryCondition = {
                id: searchFor
            }
        }

        return this.prisma.user.findUnique({
            where: queryCondition
        })
    }

    deleteMany(): Promise<any> {
        return this.prisma.user.deleteMany();
    }
} 

export { _UserRepositoryMySQL };
