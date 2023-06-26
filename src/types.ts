export type Entry = {
	location: string; // "Auckland"
	meterId: number; // 67895432
	startDate: string; // "2022-08-01"
	endDate: string; // "2022-08-31"
	provider: string; // "Powershop"
	usageKwh: number; // 501
	greenPower: number; // 0
	amountPaid: number; // 171.951
	emissions: number; // 55.16
};

export type Filters = {
	search?: string;
	startDateFrom?: string;
	startDateTo?: string;
	endDateFrom?: string;
	endDateTo?: string;
} & {
	[header in keyof Entry]?: string;
};

export type PaginationOptions = {
	page: number;
	size: number;
};

export type YearOptions = number | "All Years" | "Last 12 months";
