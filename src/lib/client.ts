import {
	PB_MessagesToClient,
	PB_MessageToClient_Initial,
	PB_MessageToClient_LoginLogout,
	PB_MessageToServer,
} from '../common/pb';
import type { ClientCommunication } from './clientCommunication';
import { reloadWindow } from './helpers';

export class Client {
	logTime = 0;

	myUsername: string | undefined;
	myUserID: number | undefined;
	myToken: string | undefined;

	constructor(private clientCommunication: ClientCommunication, private version: number) {
		clientCommunication.setCallbacks(
			this.onConnect.bind(this),
			this.onDisconnect.bind(this),
			this.onMessage.bind(this),
		);
	}

	loginWithPassword(username: string, password: string) {
		this.clientCommunication.sendMessage(
			PB_MessageToServer.toBinary({
				loginLogout: {
					loginWithPassword: {
						username,
						password,
					},
				},
			}),
		);
	}

	loginWithToken(username: string, token: string) {
		this.clientCommunication.sendMessage(
			PB_MessageToServer.toBinary({
				loginLogout: {
					loginWithToken: {
						username,
						token,
					},
				},
			}),
		);
	}

	createUserAndLogin(username: string, password: string) {
		this.clientCommunication.sendMessage(
			PB_MessageToServer.toBinary({
				loginLogout: {
					createUserAndLogin: {
						username,
						password,
					},
				},
			}),
		);
	}

	logout() {
		this.clientCommunication.sendMessage(
			PB_MessageToServer.toBinary({
				loginLogout: {
					logout: {},
				},
			}),
		);
	}

	private onConnect() {}

	private onDisconnect() {}

	private onMessage(message: Uint8Array) {
		const messages = PB_MessagesToClient.fromBinary(message).messagesToClient;

		for (const message of messages) {
			if (message.initial) {
				this.onMessage_Initial(message.initial);
			} else if (message.loginLogout) {
				this.onMessage_LoginLogout(message.loginLogout);
			}
		}
	}

	private onMessage_Initial(message: PB_MessageToClient_Initial) {
		if (message.version !== this.version) {
			reloadWindow();
		}

		this.logTime = message.logTime;
	}

	private onMessage_LoginLogout(message: PB_MessageToClient_LoginLogout) {
		this.myUsername = message.username !== '' ? message.username : undefined;
		this.myUserID = message.userId !== 0 ? message.userId : undefined;
		this.myToken = message.token !== '' ? message.token : undefined;
	}
}
