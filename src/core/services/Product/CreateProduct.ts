import { UseCase } from "../../.shared/UseCase";
import { ProductRepository } from "./@ProductRepository";

import { Product } from "../../models/Product";
import { Message } from "../../.shared/Interfaces";

type CreateProductProps = {
    name: string;
    price: any;
    amount: number;
    storeId: string;
}

class CreateProductService implements UseCase<CreateProductProps, Product | Message> {

    constructor(private readonly repository: ProductRepository){}
    async execute(data: CreateProductProps): Promise< Product | Message> {
        const { name, price, amount, storeId } = data;
        return await this.repository.create({ name, price, amount, storeId })
    }
}

export { CreateProductService }