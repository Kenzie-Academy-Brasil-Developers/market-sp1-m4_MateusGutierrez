import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProduct, IFoodProduct } from "./interfaces";

export const httpRequest = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    console.log(`${req.method} ---> ${req.url}`)
    return next()
}

export const verifyIfIdExists = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    const {productId} = req.params
    const indexProduct: number = market.findIndex(
        (val): boolean => val.id === Number(productId)
    )
    if(indexProduct === -1){
        const error: string = "Product not found"
        return res.status(404).json({error:error})
    }
    res.locals = { ...res.locals, indexProduct}
    return next()
}


export const verifyIfNameExists = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    if(req.method == "POST"){

        const payload: IProduct[] | IFoodProduct[]= req.body
    
        payload.forEach((product: IProduct | IFoodProduct) => {
            const foundProduct: IProduct | IFoodProduct | undefined = market.find(
                (val: IProduct | IFoodProduct): boolean => val.name === product.name
            )
            if(foundProduct){
                const error: string = "Product already registered"
                res.status(409).json({error})
            }
        })
    }
    const payload: IProduct | IFoodProduct= req.body
    const lookForProduct: IProduct | IFoodProduct | undefined = market.find(
        (val: IProduct | IFoodProduct): boolean => val.name === payload.name
    )
    if(lookForProduct){
        const error: string = "Product already registered"
        res.status(409).json({error})
    } 
    return next()
}
