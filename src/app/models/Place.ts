// just an interface for type safety.
export interface Place {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
	fullAdresse?: string;
	businessTypeLibelle?: string;
	businessId?: number
}