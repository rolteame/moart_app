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
	id: string,
	name: string,
	email: string,
	status: 'pending' | 'processing' | 'success' | 'failed'
}

export interface TeamFormValues {
	fullName: string,
	email: string,
	position: string,
}