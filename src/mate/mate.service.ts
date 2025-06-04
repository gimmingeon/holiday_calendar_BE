import { Repository } from "typeorm";
import { Mate } from "../entity/mate.entity";
import { User } from "../entity/user.entity";
import { Member } from "../entity/member.entity";
import { MateRole } from "../entity/enum/mateRole";

export class MateService {
    constructor(
        private readonly mateRepository: Repository<Mate>,
        private readonly userRepository: Repository<User>,
        private readonly memberRepository: Repository<Member>
    ) { }

    async registerMate(memberAId: number, memberBId: number, userId: number, mateRole: MateRole): Promise<Mate> {

        const [member1Id, member2Id] = [memberAId, memberBId].sort((a, b) => a - b);

        const user = await this.userRepository.findOneByOrFail({ id: userId });
        const member1 = await this.memberRepository.findOneByOrFail({ id: member1Id });
        const member2 = await this.memberRepository.findOneByOrFail({ id: member2Id });


        const existedMate = await this.mateRepository.findOne({
            where: {
                member1: { id: member1Id },
                member2: { id: member2Id },
                user: { id: userId },
            }
        })

        if (existedMate) {
            throw new Error('이미 등록된 짝입니다.')
        }

        const mates = this.mateRepository.create({ user, member1, member2, role: mateRole });

        return await this.mateRepository.save(mates);
    }

    async deleteMate(id: number, userId: number): Promise<{ message: string }> {

        const existedMate = await this.mateRepository.findOneBy({
            id
        });

        if (existedMate?.user.id !== userId) {
            throw new Error("권한이 없습니다.")
        }

        if (!existedMate) {
            throw new Error('존재하지 않는 짝입니다.')
        }

        await this.mateRepository.delete({
            id
        })

        return { message: "짝이 삭제되었습니다." }
    }

    async findAllMate(userId: number): Promise<{ id: number; role: MateRole; member1Name: string; member2Name: string }[]> {
        const mates = await this.mateRepository.find({
            where: { user: { id: userId } }
        })

        return mates.map((mate) => ({
            id: mate.id,
            role: mate.role,
            member1Name: mate.member1.name,
            member2Name: mate.member2.name
        }));
    }
}