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
	status: "Inactive" | "Active";
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

export interface Investment {
	amountInvested: number;
	createdAt: string;
	duration: number;
	id: string;
	interest: number;
	paymentStatus: string;
	payoutAmount: number;
	property: {
		address: string;
		availableSlot: number;
		buyInPrice: number;
		createdAt: string;
		id: string;
		image: string;
		interest: number;
		propertyDescription: string;
		propertyName: string;
		propertyPrice: number;
		propertyStatus: string;
		propertyType: string;
		slots: number;
	};
	status: string;
	transactionId: string;
	units: number;
	payoutDate: number,
}
