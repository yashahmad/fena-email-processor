import { Injectable } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(private readonly kafkaService: KafkaService){}

  getSessionToken(): string{
    const sessionToken = uuidv4();
    return sessionToken;
  }

  async addToQueue(numEmail: number, sessionToken: string): Promise<string> {
    const jobId = uuidv4();
    await this.kafkaService.produceEmailJob(jobId, numEmail, sessionToken);
    return jobId; // If Kafka generates error, return error
  }
}
