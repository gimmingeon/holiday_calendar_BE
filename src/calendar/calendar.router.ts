import { Router } from "express";
import { CalendarRepository } from "./calendar.repository";
import { CalendarService } from "./calendar.service";
import { CalendarController } from "./calendar.controller";

const calendarRouter = Router();

const calendarRepository = new CalendarRepository();
const calendarService = new CalendarService(calendarRepository);
const calendarController = new CalendarController(calendarService);

calendarRouter.post('/', (req, res) => calendarController.createCalendar(req, res));
calendarRouter.post('/move', (req, res) => calendarController.moveMonth(req, res));

export default calendarRouter;
