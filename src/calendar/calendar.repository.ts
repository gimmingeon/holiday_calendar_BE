import dayjs from "dayjs";
import { CalendarDayI } from "../entity/calendar.entity";


export class CalendarRepository {
    private calendars: CalendarDayI[] = [];

    constructor() {
        this.calendars = [];
    }

    async createCalendar(endOfMonth: number): Promise<CalendarDayI[]> {

        this.calendars = [];

        for (let i = 1; i <= endOfMonth; i++) {
            this.calendars.push({ day: i, names: [] })
        }

        return this.calendars;
    }

    async inputMember(day: number, id: number) {
        console.log(this.calendars);
    }

    async getAll(): Promise<CalendarDayI[]> {
        if (this.calendars.length === 0) {
            const today = dayjs();
            const endOfMonth = today.endOf('month').date(); // 이번 달 일 수
            await this.createCalendar(endOfMonth);
        }
        return this.calendars;
    }

}