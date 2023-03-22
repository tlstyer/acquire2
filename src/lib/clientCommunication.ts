import { PB_MessagesToClient, PB_MessageToServer } from '../common/pb';
import type { TestServerCommunication } from '../server/serverCommunication';

export abstract class ClientCommunication {
	protected onConnect = () => {};
	protected onDisconnect = () => {};
	protected onMessage = (message: Uint8Array) => {};

	setCallbacks(
		onConnect: () => void,
		onDisconnect: () => void,
		onMessage: (message: Uint8Array) => void,
	) {
		this.onConnect = onConnect;
		this.onDisconnect = onDisconnect;
		this.onMessage = onMessage;
	}

	abstract sendMessage(message: Uint8Array): void;
}

export class WebSocketClientCommunication extends ClientCommunication {
	private running = false;
	private socket: WebSocket | undefined;
	private isConnected = false;
	private reconnectTimeout: ReturnType<typeof setTimeout> | undefined;

	begin() {
		if (!this.running) {
			this.running = true;

			this.connect();
		}
	}

	end() {
		if (this.running) {
			this.running = false;
			this.socket?.close();
			if (this.reconnectTimeout !== undefined) {
				clearTimeout(this.reconnectTimeout);
			}
		}
	}

	sendMessage(message: Uint8Array) {
		if (this.running) {
			this.socket?.send(message);
		}
	}

	private connect() {
		if (this.running) {
			this.socket = new WebSocket('ws://localhost:9999');

			this.socket.binaryType = 'arraybuffer';

			this.socket.onopen = this.onSocketOpen.bind(this);
			this.socket.onmessage = this.onSocketMessage.bind(this);
			this.socket.onerror = this.onSocketError.bind(this);
			this.socket.onclose = this.onSocketClose.bind(this);
		}
	}

	private onSocketOpen(ev: Event) {
		this.isConnected = true;
		this.onConnect();
	}

	private onSocketMessage(ev: MessageEvent) {
		this.onMessage(new Uint8Array(ev.data));
	}

	private onSocketError(ev: Event) {}

	private onSocketClose(ev: CloseEvent) {
		if (this.isConnected) {
			this.isConnected = false;
			this.onDisconnect();
		}

		this.socket = undefined;

		if (this.running) {
			this.reconnectTimeout = setTimeout(() => {
				this.reconnectTimeout = undefined;
				this.connect();
			}, 1000 + 500 * Math.random());
		}
	}
}

export class TestClientCommunication extends ClientCommunication {
	communicatedMessages: TestClientCommunicatedMessage[] = [];

	constructor(private serverCommunication: TestServerCommunication) {
		super();
	}

	connect() {
		this.serverCommunication.connect(this);
		this.onConnect();
	}

	disconnect() {
		this.serverCommunication.disconnect(this);
		this.onDisconnect();
	}

	sendMessage(message: Uint8Array) {
		this.communicatedMessages.push(new TestClientCommunicatedMessage(true, message));
		this.serverCommunication.receiveMessage(this, message);
	}

	receiveMessage(message: Uint8Array) {
		this.communicatedMessages.push(new TestClientCommunicatedMessage(false, message));
		this.onMessage(message);
	}

	logAndEmptyCommunicatedMessages() {
		if (this.communicatedMessages.length > 0) {
			for (const communicatedMessage of this.communicatedMessages) {
				communicatedMessage.log();
			}
			this.communicatedMessages.length = 0;
		}
	}
}

class TestClientCommunicatedMessage {
	sentMessage: PB_MessageToServer | undefined;
	receivedMessage: PB_MessagesToClient | undefined;

	constructor(public sent: boolean, public message: Uint8Array) {
		if (sent) {
			this.sentMessage = PB_MessageToServer.fromBinary(this.message);
		} else {
			this.receivedMessage = PB_MessagesToClient.fromBinary(this.message);
		}
	}

	log() {
		if (this.sent) {
			console.log(
				'Sent:',
				Buffer.from(this.message).toString('hex'),
				`(${this.message.length} bytes)`,
			);
			console.log(JSON.stringify(this.sentMessage, null, 2));
		} else {
			console.log(
				'Received:',
				Buffer.from(this.message).toString('hex'),
				`(${this.message.length} bytes)`,
			);
			console.log(JSON.stringify(this.receivedMessage, null, 2));
		}
	}
}
