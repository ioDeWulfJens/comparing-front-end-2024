import { Auth0Client } from "@auth0/auth0-spa-js";

export class Auth0Module {
	private client: Auth0Client;

	constructor() {
		this.client = new Auth0Client({
			domain: process.env.AUTH0_DOMAIN,
			clientId: process.env.AUTH0_CLIENT_ID,
		});
	}

	async login() {
		await this.client.loginWithPopup();
	}

	async logout() {
		await this.client.logout();
	}

	async getUser() {
		const user = await this.client.getUser();
		return user;
	}

	isAuthenticated() {
		return this.client.isAuthenticated();
	}
}
