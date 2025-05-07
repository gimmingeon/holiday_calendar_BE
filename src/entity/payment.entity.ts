import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn({ unsigned: true })
    payment_id!: number;

    @Column({ type: 'int', nullable: false, unsigned: true })
    userId!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: "timestamp", nullable: false })
    expiredAt!: Date;

    @OneToOne(() => User, (user) => user.payment)
    @JoinColumn()
    user!: User;

}