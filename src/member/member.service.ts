import { Repository } from "typeorm";
import { Member } from "../entity/member.entity";
import createHttpError from "http-errors";
import { CalendarDayI } from "../entity/calendar.entity";
import { calendarRepository } from "../calendar/calendar.singleton";

export class MemberService {
    constructor(
        private readonly memberRepository: Repository<Member>,

    ) {
    }

    async registerMember(name: string, role: string, userId: number): Promise<Member> {
        // const existedMember = await this.memberRepository.findOneBy({
        //     name: name
        // });

        // if (existedMember) {
        //     throw new Error('이미 존재하는 이름입니다 이름 뒤에 숫자를 붙여 구분하세요.');
        // }

        const registerMember = await this.memberRepository.save({
            name: name,
            role: role,
            userId: userId
        });

        return registerMember;
    }

    async deleteMember(id: number): Promise<{ message: string }> {

        const findMember = await this.memberRepository.findOneBy({ id });

        if (!findMember) {
            throw createHttpError(404, "존재하지 않는 멤버입니다.")
        }
        await this.memberRepository.delete({ id });

        return { message: "멤버가 삭제되었습니다." }
    }

    async updateMember(id: number, updateName: string, updateRole: string): Promise<Member | null> {
        const updateMember = await this.memberRepository.update(
            { id: id },
            { name: updateName, role: updateRole }
        )

        return this.memberRepository.findOneBy({ id: id });
    }

    async findAllMember(userId: number): Promise<Member[]> {

        const findAllMember = await this.memberRepository.find({
            where: { userId: userId }
        });

        return findAllMember;
    }

    async findOneMember(id: number): Promise<Member | null> {
        const findOneMember = await this.memberRepository.findOneBy({
            id: id
        });

        return findOneMember;
    }


}