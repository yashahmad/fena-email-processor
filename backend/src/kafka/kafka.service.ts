import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { EmailJobService } from '../email-job/email-job.service';

@Injectable()
export class KafkaService {
    private kafka: Kafka;
    constructor(private readonly emailJobService: EmailJobService) {
        this.kafka = new Kafka({
            clientId: 'fena-backend',
            brokers: ['kafka:9092'], //Kafka broker address
        });
    }

    async produceEmailJob(jobId: string, numEmail: number, sessionToken: string) {
        const producer = this.kafka.producer();
        await producer.connect();
        const messageValue = JSON.stringify({ jobId, numEmail, sessionToken });

        await producer.send({
            topic: 'emailJob',
            messages: [
                {
                    key: jobId,
                    value: messageValue,
                },
            ],
        });

        await producer.disconnect();

        try {
            await this.emailJobService.createJob(jobId, numEmail);
        } catch (error) {
            console.error("error", error);
        }
    }
}