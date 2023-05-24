import productsService from "../services/products.service.js";

export async function getProducts(req, res) {
    const { limit, page, sort, category, status } = req.query;

    try {
        const products = await productsService.getProducts(
            limit,
            page,
            sort,
            category,
            status
        );
        res.status(200).send({
            status: "success",
            payload: products,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function getProductById(req, res) {
    const id = req.params.id;
    try {
        const product = await productsService.getProductById(id);
        if (product) {
            res.status(200).send({
                status: "success",
                product: product,
            });
        } else {
            res.status(404).send({
                status: "error",
                message: `Error getting product with id: ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(error.status).send(error.message);
    }
}

export async function addProduct(req, res) {
    const product = req.body;
    try {
        const newProduct = await productsService.addProduct(product);
        res.status(201).send({
            status: "success",
            message: "Product created successfully",
            payload: newProduct,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function updateProduct(req, res) {
    const id = req.params.id;
    const product = req.body;

    try {
        const updatedProduct = await productsService.updateProduct(id, product);
        res.status(200).send({
            status: "success",
            message: "Product updated succesfully",
            payload: updatedProduct,
        });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

export async function deleteProduct(req, res) {
    const id = req.params.id;

    try {
        const productDeleted = await productsService.deleteProduct(id);
        if (productDeleted.deletedCount === 0) {
            res.status(404).send({
                status: "error",
                message: "Not found product to delete",
            });
        } else {
            res.status(200).send({
                status: "success",
                message: "Product removed succesfully",
            });
        }
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}
