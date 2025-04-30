import { CalendarService } from "./calendar.service";
import { Response, Request } from "express";

export class CalendarController {
    private calendarService: CalendarService;

    constructor(calendarService: CalendarService) {
        this.calendarService = calendarService;
    }

    // void 스태틱은 return이 없는 경우에 사용한다
    createCalendar = async (req: Request, res: Response): Promise<void> => {

        try {
            const calendar = await this.calendarService.createCalendar();
            res.status(200).json(calendar);
        } catch (error) {
            res.status(400).json({ error: "에러입니다." });
        }

    }

    moveMonth = async (req: Request, res: Response): Promise<void> => {
        try {

            const { moveMonth }: { moveMonth: number } = req.body;
            const calendar = await this.calendarService.moveMonth(moveMonth);
            res.status(200).json(calendar);
        } catch (error) {
            res.status(400).json({ error: "에러입니다." });
        }
    }
}