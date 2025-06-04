import { Request, Response } from "express";
import { MemberConditionService } from "./memberCondition.service";
import { WeekRole } from "../entity/enum/weekRole";

export default class MemberConditionController {
    constructor(
        private readonly memberConditionService: MemberConditionService
    ) { }

    registerCondition = async (req: Request, res: Response): Promise<void> => {
        const {
            memberId,
            notHoliday,
            avoidHoliday,
            connectNotHoliday,
            connectAvoidHoliday
        }: {
            memberId: number,
            notHoliday: WeekRole[],
            avoidHoliday: WeekRole[],
            connectNotHoliday: number,
            connectAvoidHoliday: number
        } = req.body

        try {
            await this.memberConditionService.registerCondition(memberId, notHoliday, avoidHoliday, connectNotHoliday, connectAvoidHoliday);
            res.status(201).json({ message: "조건이 등록됬습니다." })
        } catch (error) {
            if (error instanceof Error) {
                if (error.message) {
                    res.status(400).json({ message: error.message });
                }
                res.status(500).json({ message: "서버 오류" });
            }
        }
    }

    deleteCondition = async (req: Request, res: Response): Promise<void> => {
        const { id }: { id: number } = req.body;
        const { id: userId } = (req as any).user;

        try {
            const condition = await this.memberConditionService.deleteCondition(id, userId);
            res.status(200).json(condition);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message) {
                    res.status(400).json({ message: error.message });
                }
                res.status(500).json({ message: "서버 오류" })
            }
        }
    }

    findAllCondition = async (req: Request, res: Response): Promise<void> => {

        const { id: userId } = (req as any).user;

        try {
            const AllCondition = await this.memberConditionService.findAllCondition(userId);
            res.status(200).json(AllCondition);
        } catch (error) {
            res.status(500).json({ message: "서버 오류" });
        }
    }
}

// memberId: number,
// notHoliday: WeekRole[],
// avoidHoliday: WeekRole[],
// connectNotHoliday: number,
// connectAvoidHoliday: number