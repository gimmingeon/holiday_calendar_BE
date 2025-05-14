import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export class UserService {

    constructor(
        private readonly userRepository: Repository<User>
    ) { }

    async signup(name: string, email: string, password: string, phoneNumber: string): Promise<User> {

        const existedUser = await this.userRepository.findOneBy({
            email
        });

        if (existedUser) {
            throw new Error("이미 존재하는 이메일입니다.");
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const signupUser = await this.userRepository.save({
            email, password: hashedPassword, name, phoneNumber
        })

        return signupUser;
    }

    async signIn(email: string, password: string): Promise<string> {


        const existedUser = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if (!existedUser) {
            throw new Error("이메일가 틀렸습니다..");
        } else if (!(await bcrypt.compare(password, existedUser.password))) {
            throw new Error("비밀번호가 틀렸습니다.");
        }

        const accessToken = jwt.sign({ id: existedUser.id }, 'custom-secret-key', { expiresIn: "3h" });

        return accessToken;
    }

    async myInfo(userId: number): Promise<User | null> {
        const existedUser = await this.userRepository.findOneBy({
            id: userId
        });

        return existedUser
    }
}