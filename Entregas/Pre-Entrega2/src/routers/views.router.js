import { Router } from "express"
// import fs from "fs"
import ProductManager from "../dao/dbManagers/product.manager.js"

const viewsRouter = Router()
const productManager = new ProductManager()

// viewsRouter.get('/', async (req, res) => {
//     let products = []
//     try{
//     const data = await fs.promises.readFile('./src/files/products.json')
//     products = JSON.parse(data)
//     }catch(err){
//         console.log(err)
//     }

//     res.render('home', { products })
// })

// viewsRouter.get('/realTimeProducts', async (req, res) => {
//     let products = []
//     try{
//         const data = await fs.promises.readFile('./src/files/products.json')
//         products = JSON.parse(data)
//     }catch(err){
//         console.log(err)
//     }
    
//     res.render('realTimeProducts',{products})
// })

viewsRouter.get('/products', async (req, res) => {
    const { limit, page, sort, category, status } = req.query
    let products = []

    try{
        products = await productManager.getProducts(limit, page, sort, category, status)
        
    }catch(err){
        console.log(err)
    }
    
    res.render('products', {products})
})

export default viewsRouter