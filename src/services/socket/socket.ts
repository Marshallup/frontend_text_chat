import { io, Socket } from 'socket.io-client';

class ChatSocket {
    public socket: Socket | null = null;
    private isConnected: boolean = false;

    public initConnection() {
        if (!this.isConnected) {
            this.setIsConnected(true);

            this.socket = io(process.env.REACT_APP_WS_HOST as string, {
                transports: ['websocket'],
            });
        }
    }
    public setIsConnected(status: boolean) {
        this.isConnected = status;
    }
}

export default new ChatSocket();