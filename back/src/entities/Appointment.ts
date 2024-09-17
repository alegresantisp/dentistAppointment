import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export enum AppointmentStatus {
    Active = "active",
    Cancelled = "cancelled"
}

@Entity({
    name: "appointments"
})
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    time: string;

    @Column()
    status: AppointmentStatus;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.appointments)
    user: User;
}
