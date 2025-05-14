import { Router } from "express";
import { AppDataSourse } from "../data-sourse";
import { User } from "../entity/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { jwtMiddleware } from "../middleware/jwt-validate-middleware";

const userRouter = Router();

const userRepository = AppDataSourse.getRepository(User);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.post('/', (req, res) => userController.signUp(req, res));
userRouter.post('/login', (req, res) => userController.signIn(req, res));
userRouter.get('/myInfo', jwtMiddleware, (req, res) => userController.myInfo(req, res));

export default userRouter