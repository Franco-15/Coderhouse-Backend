// ==== GET USERS =====
async function getUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
}

// ==== GET PRODUCTS =====
async function getProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data.payload;
}

// ==== DELETE ALL CART PRODUCTS =====
const deleteAllCartProducts = (cid) => {

    const btnDeleteAllCartProducts = document.getElementById(`clear-cart-${cid}`);
    if (btnDeleteAllCartProducts) {
        btnDeleteAllCartProducts.onclick = async (e) => {
            e.preventDefault();
            const response = await fetch(`/api/carts/${cid}`, {
                method: "DELETE",
            })
            const result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Eliminacion de productos del carrito",
                    text: "No se pudieron eliminar los productos del carrito",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Eliminacion de productos del carrito",
                    text: "Se eliminaron los productos del carrito correctamente",
                }).then(() => {
                    window.location.reload();
                });
            }
        }
    }
}

// ==== DELETE PRODUCT FROM ID =====
function deleteProductFromCart(cid, pid) {
    let product = document.getElementById(`deleteProduct${pid}-Cart${cid}`);

    if (product)
        product.onclick = async (e) => {
            e.preventDefault();
            const response = await fetch(`/api/carts/${cid}/product/${pid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Eliminacion de producto del carrito",
                    text: "No se pudo eliminar el producto del carrito",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Eliminacion de producto del carrito",
                    text: "Se elimino el producto del carrito correctamente",
                }).then(() => {
                    window.location.reload();
                });
            }
        };
}

const finalizePurchase = (cid, products) => {
    const finalizebtn = document.getElementById(`finalize-${cid}`);
    if (finalizebtn) {
        finalizebtn.onclick = async (e) => {
            e.preventDefault();
            const response = await fetch(`/api/carts/${cid}`, {
                method: "GET",
            })
            const result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Error al Finalizar la compra",
                    text: "Ocurrio un error al finalizar la compra. Intente nuevamente.",
                });
            } else {
                try {
                    const { products: cartProducts } = result;
                    cartProducts.forEach((cartProduct) => {
                        const quantity = cartProduct.quantity;
                        const id = cartProduct.product._id;
                        const product = products.find((product) => product.id === id);
                        const { stock } = product;
                        if (stock < quantity) {
                            throw (400, {
                                status: "error",
                                message: `No hay stock suficiente de ${product.title}.\n
                                Stock disponible: ${stock}`,
                            });
                        }
                    });
                    window.location.href = "/payment";
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error al Finalizar la compra",
                        text: `${error.message}`,
                    });
                }
            }
        }
    }
}

const main = async () => {
    let products = await getProducts();
    let users = await getUsers();

    const usersId = users.payload.map((user) => user.cartId);
    const idProducts = products.payload.map((product) => product.id);


    products.payload.forEach((product) => {
        usersId.forEach((cid) => {
            deleteProductFromCart(cid, product.id);
            deleteAllCartProducts(cid);
            finalizePurchase(cid, products.payload);
        });
    });
};

main();
