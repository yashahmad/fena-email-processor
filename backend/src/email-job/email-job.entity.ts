import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ "name": "email_job" })
export class EmailJob extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobId: string;

    @Column()
    numEmail: number;

    @Column({ default: 'pending' })
    status: string
}