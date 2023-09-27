import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  cors: {
    origin: '*',
  }
  @WebSocketServer() server: Server;

  private clients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const sessionToken = client.handshake.query.token as string;
    if (sessionToken) {
      this.clients.set(sessionToken, client);
    }
    console.table(this.clients);
  }

  handleDisconnect(client: Socket) {
    this.clients.forEach((value, key) => {
      if (value === client) {
        this.clients.delete(key);
      }
    });
    console.table(this.clients);
  }

  getClientSocketBySessionToken(sessionToken: string): Socket | any {
    return this.clients.get(sessionToken);
  }

  sendClientSpecificUpdate(sessionToken: string, data: any) {
    const client = this.getClientSocketBySessionToken(sessionToken);
    if (client) {
      client.emit('clientSpecificUpdate', data);
    } else {
      console.log(`Client with sessionToken ${sessionToken} not reachable`);
    }
  }
}