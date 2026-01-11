import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // Метод для отправки событий всем клиентам
  emitUpdate(event: string, data?: any) {
    this.server.emit(event, data);
  }
}
