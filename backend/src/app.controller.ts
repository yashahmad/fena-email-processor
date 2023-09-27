import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getSessionToken(): string {
    return this.appService.getSessionToken();
  }

  @Post('/send')
  async sendEmail(@Headers('authorization') token: string, @Body() data: { numEmail: number }) {
    try {
      if (!token) {
        return { message: 'Authorization token is missing.' };
      }
      const jobId = await this.appService.addToQueue(data.numEmail, token);
      return { jobId };
    } catch (error) {
      console.error(error);
    }
  }
}
