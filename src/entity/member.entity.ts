import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Member {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'int', nullable: false, unsigned: true })
    userId!: number;

    @Column({ type: 'varchar', nullable: false })
    name!: string;

    @Column({ type: "int", nullable: false, unsigned: true, default: 1 })
    holiday_count!: number;

    @Column({ type: 'varchar', nullable: true, default: "사회복지사" })
    role!: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.members, { onDelete: "CASCADE" })
    @JoinColumn()
    user!: User;
}