import { Product } from "../../models/Product";

interface ProductRepository {
    create(product: Product): Promise<Product>;
}

export { ProductRepository }