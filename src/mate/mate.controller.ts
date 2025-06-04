import { Request, Response } from "express";
import { MateService } from "./mate.service";
import { MateRole } from "../entity/enum/mateRole";

export default class MateController {
    constructor(
        private readonly mateService: MateService
    ) { }

    registerMate = async (req: Request, res: Response): Promise<void> => {
        const { memberAId, memberBId, mateRole }: { memberAId: number, memberBId: number, mateRole: MateRole } = req.body;

        const { id: userId } = (req as any).user;

        try {
            await this.mateService.registerMate(memberAId, memberBId, userId, mateRole);

            res.status(201).json({ message: "짝이 등록되었습니다." })
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === "이미 등록된 짝입니다.") {
                    res.status(409).json({ message: error.message });
                }
                res.status(500).json({ message: "서버 오류가 발생" })
            }
        }
    }

    deleteMate = async (req: Request, res: Response): Promise<void> => {
        const { id }: { id: number } = req.body;
        const { id: userId } = (req as any).user;

        try {
            const mate = await this.mateService.deleteMate(id, userId);
            res.status(200).json(mate);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message) {
                    res.status(400).json({ message: error.message });
                }
                res.status(500).json({ message: "서버 오류 발생" });
            }
        }
    }

    findAllMate = async (req: Request, res: Response): Promise<void> => {
        const { id: userId } = (req as any).user;

        const mate = await this.mateService.findAllMate(userId);

        res.status(200).json(mate);
    }
}