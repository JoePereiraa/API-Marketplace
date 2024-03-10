import { PrismaClient, Prisma } from "@prisma/client";
import { Product } from "../../core/models/Product";
import { ProductRepository } from "../../core/services/Product/@ProductRepository";

class _ProductRepositoryMySQL implements ProductRepository {

    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async create(product: Product): Promise<Product> {
        type CreateProductProps = {
            name: string;
            price: Prisma.Decimal;
            amount: number;
            storeId: string;
        }
        const { name, price, amount, storeId } = product as CreateProductProps

        return await this.prisma.product.create({
            data: { name, price, amount, Store: {
                    connect: {
                        id: storeId
                    }
                } 
            }
        })
    }
}

export { _ProductRepositoryMySQL }