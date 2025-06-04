import { Repository } from "typeorm";
import { Member } from "../entity/member.entity";
import { MemberCondition } from "../entity/memberCondition.entity";
import { WeekRole } from "../entity/enum/weekRole";

export class MemberConditionService {
    constructor(
        private readonly memberRepository: Repository<Member>,
        private readonly memberConditionRepository: Repository<MemberCondition>
    ) { }

    async registerCondition(
        memberId: number,
        notHoliday: WeekRole[],
        avoidHoliday: WeekRole[],
        connectNotHoliday: number,
        connectAvoidHoliday: number
    ) {
        const member = await this.memberRepository.findOneByOrFail({ id: memberId });

        let condition = await this.memberConditionRepository.findOne({ where: { member: { id: memberId } } })

        if (condition) {
            condition.notHoliday = notHoliday;
            condition.avoidHoliday = avoidHoliday;
            condition.connectNotHoliday = connectNotHoliday;
            condition.connectAvoidHoliday = connectAvoidHoliday;
        } else {
            condition = this.memberConditionRepository.create({
                member,
                notHoliday,
                avoidHoliday,
                connectNotHoliday,
                connectAvoidHoliday
            });
        }

        return await this.memberConditionRepository.save(condition);
    }

    async deleteCondition(id: number, userId: number): Promise<{ message: string }> {
        const condition = await this.memberConditionRepository.findOne({
            where: { id },
            relations: ['member'],
        })

        if (!condition) {
            throw new Error("존재하지 않는 멤버조건입니다.");
        }

        if (condition.member.userId !== userId) {
            throw new Error("권한이 없는 아이디입니다.")
        }

        await this.memberConditionRepository.delete({
            id
        });

        return { message: "조건이 삭제되었습니다." }
    }

    async findAllCondition(userId: number): Promise<{
        id: number;
        memberId: number;
        name: string;
        notHoliday: number[];
        avoidHoliday: number[];
        connectNotHoliday: number;
        connectAvoidHoliday: number
    }[]> {

        const condition = await this.memberConditionRepository.find({
            where: { member: { userId } },
            relations: ['member']
        });

        return condition.map((member) => ({
            id: member.id,
            memberId: member.member.id,
            name: member.member.name,
            notHoliday: member.notHoliday,
            avoidHoliday: member.avoidHoliday,
            connectNotHoliday: member.connectNotHoliday,
            connectAvoidHoliday: member.connectAvoidHoliday
        }))
    }
}