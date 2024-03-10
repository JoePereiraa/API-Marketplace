import { Request, Response } from "express";
import { CreateProductService } from "../../core/services/Product/CreateProduct";
import { _ProductRepositoryMySQL } from "../../external/prisma/Product.Repository";
import { _StoreRepositoryMySQL } from "../../external/prisma/Store.Repository";


//Connection
const connectProductRepository = new _ProductRepositoryMySQL()

//Create
const CreateProductController = async (req: Request, reply: Response) => {
    type CreateProductProps = {
        name:    string;
        price:   string;
        amount:  number;
        storeId: string;
    }

    try {
        const { name, price, amount } = req.body as CreateProductProps;
        const { storeId } = req.params;

        const product = await new CreateProductService(connectProductRepository).execute({ name,  price, amount, storeId });

        return reply.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        return reply.status(500).json({ error: "Internal Server Error" });
    }
};

export { CreateProductController }