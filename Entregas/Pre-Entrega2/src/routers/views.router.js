import { Router } from "express"
// import fs from "fs"
import ProductManager from "../dao/dbManagers/product.manager.js"
import CartManager from "../dao/dbManagers/cart.manager.js"

const viewsRouter = Router()
const productManager = new ProductManager()
const cartManager = new CartManager()

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

    const infoRender = {
        products: products.payload,
        totalPages: products.totalPages,
        hasPrevPAge: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage:  products.prevPage,
        nextPage: products.nextPage,
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
        sort: sort ? parseInt(sort) : 1,
        category: category ? category : undefined,
        status: status ? status : undefined,
    }

    res.render('products', infoRender)
})

viewsRouter.get('/cart/:cid', async (req, res) => {
    const cid = req.params.cid

    try{
        const cart = await cartManager.getCartByID(cid)

        if(cart){
            res.render('cart', {cart})
        }else{
            res.status(404).send({
                status: "error",
                message: "Not found cart",
            })
        }

    }catch(error){
        console.log({
            status: error.status,
            message: error.message,
        })
    }
})

export default viewsRouter