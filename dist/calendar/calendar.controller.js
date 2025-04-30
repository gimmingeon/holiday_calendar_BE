"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
class CalendarController {
    constructor(calendarService) {
        // void 스태틱은 return이 없는 경우에 사용한다
        this.createCalendar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const calendar = yield this.calendarService.createCalendar();
                res.status(200).json(calendar);
            }
            catch (error) {
                res.status(400).json({ error: "에러입니다." });
            }
        });
        this.moveMonth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { moveMonth } = req.body;
                const calendar = yield this.calendarService.moveMonth(moveMonth);
                res.status(200).json(calendar);
            }
            catch (error) {
                res.status(400).json({ error: "에러입니다." });
            }
        });
        this.calendarService = calendarService;
    }
}
exports.CalendarController = CalendarController;
