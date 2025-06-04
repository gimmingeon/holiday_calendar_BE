import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Member } from "./member.entity";
import { Payment } from "./payment.entity";
import { Mate } from "./mate.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    name!: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    email!: string;

    @Column({ type: 'varchar', nullable: false })
    password!: string;

    @Column({ type: 'varchar', nullable: false })
    phoneNumber!: string;

    // @IsEnum(Role)
    // @Column({ type: 'enum', enum: Role, default: Role.User })
    // role: Role;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

    @OneToMany(() => Member, (member) => member.user)
    members!: Member[];

    @OneToOne(() => Payment, (payment) => payment.user)
    payment!: Payment;

    @OneToMany(() => Mate, (mate) => mate.user)
    mate!: Mate[];
}