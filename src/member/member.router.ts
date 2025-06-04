import { Router } from "express";
import { AppDataSourse } from "../data-sourse";
import { Member } from "../entity/member.entity";
import { MemberService } from "./member.service";
import MemberController from "./member.controller";

const memberRouter = Router();

const memberRepository = AppDataSourse.getRepository(Member);
const memberService = new MemberService(memberRepository);
const memberController = new MemberController(memberService);

memberRouter.post('/', (req, res) => memberController.registerMember(req, res));
memberRouter.delete('/', (req, res) => memberController.deleteMember(req, res));
memberRouter.get('/', (req, res) => memberController.findAllMember(req, res));
memberRouter.post('/find', (req, res) => memberController.findOneMember(req, res));
memberRouter.patch('/', (req, res) => memberController.updateMember(req, res));

export default memberRouter;