export interface Option {
	id: number;
	name: string;
}

export type APIResponse = Promise<{
    success: any;
} | {
    error: any;
}>