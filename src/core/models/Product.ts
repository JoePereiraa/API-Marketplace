import { Prisma } from "@prisma/client";

interface Product {
    id?:         string;
    name:        string;
    price:       Prisma.Decimal;
    amount:      number;
    storeId:     string | null;
    created_at?: Date;
    updated_at?: Date;
}

export { Product }