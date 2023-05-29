import express, { Application } from "express"
import { createProducts, deleteProducts, getProduct, readProducts, updateProduct } from "./logics"
import {  verifyIfIdExists, verifyIfNameExists } from "./middlewares"

const  app: Application = express()
app.use(express.json())

app.post("/products", verifyIfNameExists,createProducts)

app.get("/products", readProducts)

app.get("/products/:productId", verifyIfIdExists,getProduct)

app.patch("/products/:productId", verifyIfIdExists, verifyIfNameExists,updateProduct)

app.delete("/products/:productId", verifyIfIdExists,deleteProducts)

app.listen(3000, () => console.log("Server is running"))