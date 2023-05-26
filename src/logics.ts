import { Response, Request } from "express"
import { IFoodProduct, IProduct, TProductCreate, TProductUpdate } from "./interfaces"
import { market, marketCreate, superMarket } from "./database"


const getNextId = (): number => {
    const lastProduct: IProduct | IFoodProduct | undefined = market
    .sort((a, b): number => a.id - b.id)
    .at(-1)
    if(!lastProduct) return 1
    return lastProduct.id + 1
}


export const createProducts = (req: Request, res: Response): Response => {
    const payload: TProductCreate[]= req.body
    marketCreate.splice(0, marketCreate.length)
    const currentDate = new Date()
    const nextYearDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
        )
    nextYearDate.setFullYear(nextYearDate.getFullYear() + 1)

    const total = payload.reduce((acc, val) => acc + val.price, 0)
    
    payload.forEach((product) => {
        const newProduct: IProduct | IFoodProduct = {
            ...product,
            id: getNextId(),
            expirationDate: (nextYearDate).toISOString(), 
        }
        marketCreate.push(newProduct)
        market.push(newProduct)
        

    })
    return res.status(201).json({
        "total": total,
        "marketProducts": marketCreate,
    })
}


export const readProducts = (req: Request, res: Response): Response => {
    const total = market.reduce((acc, val) => acc + val.price, 0)

    return res.json({
        "total": total,
        "marketProducts": market
    })
}


export const getProduct = (req: Request, res: Response): Response => {
    const {indexProduct} = res.locals
    console.log(indexProduct)
    const product: IProduct | IFoodProduct = market[indexProduct] 

    return res.json(product)
}



export const updateProduct = (req: Request, res: Response): Response => {
    const {indexProduct} = res.locals
    const payload: TProductUpdate = req.body
    delete payload.id
    delete payload.expirationDate
    delete payload.section

    const update: IProduct | IFoodProduct = (market[indexProduct] = {
        ...market[indexProduct],
        ...payload,
    })
    return res.status(200).json(update)
 
}

export const deleteProducts = (req: Request, res: Response): Response => {
    const {indexProduct} = res.locals

    market.splice(indexProduct, 1)
    return res.status(204).json()

}