import { Store } from "../../models/Store"

interface StoreRepository {
    create(store: Store): Promise<Store>
    getAllStores(): Promise<Store[]>
}

export { StoreRepository }