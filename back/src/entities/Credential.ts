import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";


@Entity({
    name: "credentials"
})

export class Credential {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    login: boolean;

    @OneToOne(() => User, (user) => user.credential)
    user: User;
}
