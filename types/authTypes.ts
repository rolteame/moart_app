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

export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export interface User {
	id: string,
	name: string,
	email: string,
	status: 'pending' | 'processing' | 'success' | 'failed'
}
