export enum AppointmentStatus {
    Active = 'active',
    Cancelled = 'cancelled'
}

export interface IAppointment {
    id: number;
    date: Date;
    time: string;
    userId: number;
    status: AppointmentStatus;  
}

export default IAppointment;