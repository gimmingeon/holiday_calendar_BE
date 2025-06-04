import { Router } from "express";
import { AppDataSourse } from "../data-sourse";
import { Member } from "../entity/member.entity";
import { MemberCondition } from "../entity/memberCondition.entity";
import { MemberConditionService } from "./memberCondition.service";
import MemberConditionController from "./memberCondition.controller";

const conditionRouter = Router();

const memberRepository = AppDataSourse.getRepository(Member);
const conditionRepository = AppDataSourse.getRepository(MemberCondition);
const conditionService = new MemberConditionService(memberRepository, conditionRepository);
const conditionController = new MemberConditionController(conditionService);

conditionRouter.post('/', (req, res) => conditionController.registerCondition(req, res));
conditionRouter.get('/', (req, res) => conditionController.findAllCondition(req, res));
conditionRouter.delete('/', (req, res) => conditionController.deleteCondition(req, res));

export default conditionRouter;