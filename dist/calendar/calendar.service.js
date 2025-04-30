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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class CalendarService {
    constructor(calendarRepository) {
        this.calendarRepository = calendarRepository;
    }
    createCalendar() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = (0, dayjs_1.default)();
            const endOfMonth = parseInt(today.endOf('month').format("DD"));
            return yield this.calendarRepository.createCalendar(endOfMonth);
            // return await this.calendarRepository.getAll();
        });
    }
    moveMonth(moveMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            const today = (0, dayjs_1.default)();
            const endOfMonth = parseInt(today.add(moveMonth, "month").endOf("month").format("DD"));
            return yield this.calendarRepository.createCalendar(endOfMonth);
        });
    }
}
exports.CalendarService = CalendarService;
