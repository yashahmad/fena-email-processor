import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { EmailJob } from "./email-job.entity";

@Injectable()
export class EmailJobService {
    constructor(@InjectRepository(EmailJob) private emailJobRepository: Repository<EmailJob>) { }

    async createJob(jobId: string, numEmail: number): Promise<EmailJob> {
        const job = new EmailJob();
        job.jobId = jobId;
        job.numEmail = numEmail;
        return await this.emailJobRepository.save(job);
    }
} 