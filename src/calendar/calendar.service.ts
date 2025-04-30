import dayjs from "dayjs";
import { CalendarRepository } from "./calendar.repository";
import { CalendarDayI } from "../entity/calendar.entity";

export class CalendarService {
    private calendarRepository: CalendarRepository;

    constructor(calendarRepository: CalendarRepository) {
        this.calendarRepository = calendarRepository;
    }

    async createCalendar(): Promise<CalendarDayI[]> {
        const today = dayjs();
        const endOfMonth = parseInt(today.endOf('month').format("DD"));

        return await this.calendarRepository.createCalendar(endOfMonth);

        // return await this.calendarRepository.getAll();
    }

    async moveMonth(moveMonth: number): Promise<CalendarDayI[]> {
        const today = dayjs();

        const endOfMonth = parseInt(today.add(moveMonth, "month").endOf("month").format("DD"));

        return await this.calendarRepository.createCalendar(endOfMonth);
    }


}