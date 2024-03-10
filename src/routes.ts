// import { UserRoutes } from "./routes/User";
import { Router } from "express";
import { GetUsersController, CreateUserController, DeleteUsersController } from "./adapters/controllers/UserController"
import { CreateAccessController, GetAccessController } from "./adapters/controllers/AccessController";
import { CreateStoreController, ReadAllController } from "./adapters/controllers/StoreController";
import { CreateProductController } from "./adapters/controllers/ProductController";

const router = Router()

router.post('/user', CreateUserController)
router.get('/users', GetUsersController)
router.delete('/delete-users', DeleteUsersController)

router.post('/access', CreateAccessController)
router.get('/accesses', GetAccessController)

router.post('/store/:userId', CreateStoreController)
router.get('/stores', ReadAllController)

router.post('/product/:storeId', CreateProductController)

export { router }