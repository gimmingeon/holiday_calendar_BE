import { Router } from "express";
import { AppDataSourse } from "../data-sourse";
import { Mate } from "../entity/mate.entity";
import { MateService } from "./mate.service";
import MateController from "./mate.controller";
import { User } from "../entity/user.entity";
import { Member } from "../entity/member.entity";

const mateRouter = Router();

const mateRepository = AppDataSourse.getRepository(Mate);
const userRepository = AppDataSourse.getRepository(User);
const memberRepository = AppDataSourse.getRepository(Member);
const mateService = new MateService(mateRepository, userRepository, memberRepository);
const mateController = new MateController(mateService);

mateRouter.post('/', (req, res) => mateController.registerMate(req, res));
mateRouter.delete('/', (req, res) => mateController.deleteMate(req, res));
mateRouter.get('/', (req, res) => mateController.findAllMate(req, res));

export default mateRouter;