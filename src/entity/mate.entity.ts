import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { Member } from "./member.entity";
import { MateRole } from "./enum/mateRole";

@Entity()
@Unique(["member1", "member2"])
export class Mate {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: "enum", enum: MateRole, default: MateRole.together })
    role!: MateRole;

    @ManyToOne(() => Member, { eager: true, onDelete: "CASCADE" })
    @JoinColumn()
    member1!: Member

    @ManyToOne(() => Member, { eager: true, onDelete: "CASCADE" })
    @JoinColumn()
    member2!: Member

    @ManyToOne(() => User, (user) => user.mate, { onDelete: 'CASCADE' })
    @JoinColumn()
    user!: User;
}