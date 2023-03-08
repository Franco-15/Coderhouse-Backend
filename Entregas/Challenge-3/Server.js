import express from 'express';
import fs from 'fs';

const app = express()
const PORT = 8080
const PATH = './files/products.json'

app.use(express.urlencoded({extended:true}))

app.get('/products',async (req,res) => {
    const products = await getProducts()
    if(products.length > 0){
        const {limit} = req.query
        if(limit){
            let limitedProducts = products.slice(0,limit)
            res.send({...limitedProducts})
        }
        else
            res.send({...products})

    }
    else
        res.send({"error": "No hay productos cargados"})
})

app.get('/products/:id',async (req,res) => {
    const products = await getProducts()
    const id = req.params.id
    if(products.length > 0){
        let product = products.find((product) => product.id == id)
        if(product)
            res.send(product)
        else
            res.send({"error": "No existe producto con el id ingresado"})
    }
    else
        res.send({"error": "No hay productos cargados"})
})

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const getProducts = async () => {

    try{
        if (fs.existsSync(PATH)) {
        const data = await fs.promises.readFile(PATH);
        const products = JSON.parse(data);
        return products;
        } else return [];
    }
    catch(err){
        return []
    }   
}