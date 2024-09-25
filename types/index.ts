export interface Login {
	email: string;
	password: string;
}

export interface Properties {
	results: object[];
	page: number;
	limit: number;
	totalPages: number;
	totalResults: number;
}

export interface User {
	id: string;
	name: string;
	email: string;
	status: "pending" | "processing" | "success" | "failed";
}

export interface TeamFormValues {
	fullName: string;
	email: string;
	position: string;
}

export interface ChangePassword {
	password: string;
	newPassword: string;
}

export interface NotificationsInput {
	subject: string;
	message: string;
}

export interface ChangePasswordInput {
	password: string;
}
export interface ResetPasswordInput {
	email: string;
}
export interface AddPropertyInput {
	propertyName: string;
	propertyType: string;
	propertyStatus: string;
	propertyPrice: number;
	buyInPrice: number;
	interest: number;
	propertyDescription: string;
	address: string;
	slots: number;
	image: string;
}
