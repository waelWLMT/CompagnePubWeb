import { Size } from "./Size";

export class ProductType {
    name: string;
    price: number;
    size?: Size;
    color?: string;
    description?: string;
    unit: number;
    defaultNbrProductPerBusiness: number;
}