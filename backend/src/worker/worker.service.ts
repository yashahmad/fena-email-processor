import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KafkaService } from '../kafka/kafka.service';
import { EmailJobService } from '../email-job/email-job.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class WorkerService implements OnModuleInit {
    private kafka: Kafka;
    private consumer: any;
    private jobClientMap = new Map<string, string>();

    constructor(
        private readonly kafkaService: KafkaService,
        private readonly emailJobService: EmailJobService,
        private readonly websocketGateway: WebsocketGateway
    ) {
        this.kafka = new Kafka({
            clientId: 'worker',
            brokers: ['kafka:9092']
        });
        this.consumer = this.kafka.consumer({ groupId: 'email-worker' });
    }

    async onModuleInit() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'emailJob' });
        await this.consumer.run({
            eachMessage: async ({ message }) => {
                const { jobId, numEmail, sessionToken } = JSON.parse(message.value.toString());
                console.log(`Processing job ${jobId}, sending ${numEmail} emails ...`);

                // Notifying client
                this.notifyClient(sessionToken, `Processing job ${jobId}, sending ${numEmail} emails ...`);

                // Process emails in a loop and send status updates for each email
                for (let i = 1; i <= numEmail; i++) {
                    await this.processEmails(jobId, i, sessionToken);
                }

                // Notify clients that processing is complete
                this.notifyClient(sessionToken, `${jobId} Processed`);
            }
        });
    }

    async processEmails(jobId: string, numEmail: number, sessionToken: string) {
        console.log(`Processing email ${numEmail} of job ${jobId}...`);
        this.notifyClient(sessionToken, `Processing email ${numEmail} of job ${jobId}...`);
    }

    private notifyClient(sessionToken: string, update: string) {
        const client = this.websocketGateway.getClientSocketBySessionToken(sessionToken);
        if (client) {
            client.emit('clientSpecificUpdate', update);
        } else {
            console.log(`Client with sessionToken ${sessionToken} not reachable.`);
        }
    }
}
