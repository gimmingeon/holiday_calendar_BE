import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Member } from "./member.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ unsigned: true })
    id!: number;

    @Column({ type: 'varchar', nullable: false })
    name!: string;

    @Column({ type: 'varchar', unique: true, nullable: false })
    login_id!: string;

    @Column({ type: 'varchar', nullable: false })
    password!: string;

    // @IsEnum(Role)
    // @Column({ type: 'enum', enum: Role, default: Role.User })
    // role: Role;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

    @OneToMany(() => Member, (member) => member.user)
    members!: Member[];
}