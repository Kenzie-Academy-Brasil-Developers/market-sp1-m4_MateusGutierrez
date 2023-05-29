export interface IProduct{
    id: number,
    name: string,
    price: number,
    weight: number,
    section: string,
    expirationDate: string,
}
export interface ICleanProduct{
    id: number,
    name: string,
    price: number,
    weight: number,
    section: string,
    expirationDate: string,
}
export interface IFoodProduct extends IProduct{
    calories: number;
}

export type TProductCreate = Omit<IProduct, "id" | "expirationDate">

export type TProductUpdate = Partial<IProduct>

