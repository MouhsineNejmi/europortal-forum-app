export interface IUser {
	id: string;
	image?: string;
	username: string;
	email: string;
	password: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

export type Token = {
	role: string;
	id: string;
};
