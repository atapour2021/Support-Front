import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RealtimeService {
  constructor(private socket: Socket) {
    const token = localStorage.getItem('token');
    const io = socket.ioSocket;
    io['auth'] = { token: token };
  }

  sendNotification(message: string): void {
    this.socket.emit('notification', message);
  }

  receiveNotification(): Observable<string> {
    return this.socket.fromEvent('notification');
  }

  handleConnection(): Observable<string> {
    return this.socket.fromEvent('connectionEvent');
  }

  onDisconnect(event: any): Observable<any> {
    return this.socket.fromEvent('disconnect');
  }
}
