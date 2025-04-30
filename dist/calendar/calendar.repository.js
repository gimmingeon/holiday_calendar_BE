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
exports.CalendarRepository = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class CalendarRepository {
    constructor() {
        this.calendars = [];
        this.calendars = [];
    }
    createCalendar(endOfMonth) {
        return __awaiter(this, void 0, void 0, function* () {
            this.calendars = [];
            for (let i = 1; i <= endOfMonth; i++) {
                this.calendars.push({ day: i, names: [] });
            }
            return this.calendars;
        });
    }
    inputMember(day, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.calendars);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.calendars.length === 0) {
                const today = (0, dayjs_1.default)();
                const endOfMonth = today.endOf('month').date(); // 이번 달 일 수
                yield this.createCalendar(endOfMonth);
            }
            return this.calendars;
        });
    }
}
exports.CalendarRepository = CalendarRepository;
