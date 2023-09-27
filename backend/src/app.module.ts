import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaService } from './kafka/kafka.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailJobService } from './email-job/email-job.service';
import { EmailJob } from './email-job/email-job.entity';
import { WorkerService } from './worker/worker.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "mysql",
    port: 3306,
    username: "fenaUser",
    password: "fenaPassword",
    database: "fenaDB",
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
  TypeOrmModule.forFeature([EmailJob])
  ],
  controllers: [AppController],
  providers: [AppService, KafkaService, EmailJobService, WorkerService, WebsocketGateway],
})
export class AppModule { }
