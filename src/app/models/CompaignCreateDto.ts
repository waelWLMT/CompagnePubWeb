export class CompaignCreateDto {
    title: string;
    goal: string;
    customerId? : number;
    forecastBudget: number;
    regionId?: number;
    townsIds: any[];
    businessTypesIds: any[];
    productTypeIds: number;   
    executionDate: Date;
    description: string;
    userId: number;
}