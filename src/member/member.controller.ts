import { Request, Response } from "express";
import { MemberService } from "./member.service";

export default class MemberController {
    constructor(
        private readonly memberService: MemberService
    ) { }

    registerMember = async (req: Request, res: Response): Promise<void> => {
        const { name, role }: { name: string, role: string } = req.body;

        const { id: userId } = (req as any).user;

        const member = await this.memberService.registerMember(name, role, userId);

        res.status(201).json(member);
    }

    deleteMember = async (req: Request, res: Response): Promise<void> => {
        const { id }: { id: number } = req.body;

        const member = await this.memberService.deleteMember(id);

        res.status(200).json(member);
    }

    updateMember = async (req: Request, res: Response): Promise<void> => {
        const { id, updateName, updateRole }: { id: number, updateName: string, updateRole: string } = req.body;

        const member = await this.memberService.updateMember(id, updateName, updateRole);

        res.status(200).json(member);
    }

    findAllMember = async (req: Request, res: Response): Promise<void> => {

        const { id: userId } = (req as any).user;

        const member = await this.memberService.findAllMember(userId);

        res.status(200).json(member);
    }

    findOneMember = async (req: Request, res: Response): Promise<void> => {

        const { id }: { id: number } = req.body;

        const member = await this.memberService.findOneMember(id)

        res.status(200).json(member);
    }
}