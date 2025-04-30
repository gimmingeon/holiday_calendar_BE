import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

export class UserService {

    constructor(
        private readonly userRepository: Repository<User>
    ) { }

    async signup(name: string, login_id: string, password: string): Promise<User> {

        const existedUser = await this.userRepository.findOneBy({
            login_id: login_id
        });

        if (existedUser) {
            throw new Error("이미 존재하는 id입니다.");
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const signupUser = await this.userRepository.save({
            login_id, password: hashedPassword, name
        })

        return signupUser;
    }

    async signIn(login_id: string, password: string): Promise<string> {


        const existedUser = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.login_id = :login_id', { login_id })
            .getOne();

        if (!existedUser) {
            throw new Error("아이디가 틀렸습니다..");
        } else if (!(await bcrypt.compare(password, existedUser.password))) {
            throw new Error("비밀번호가 틀렸습니다.");
        }

        const accessToken = jwt.sign({ id: existedUser.id }, 'custom-secret-key', { expiresIn: "3h" });

        return accessToken;
    }
}