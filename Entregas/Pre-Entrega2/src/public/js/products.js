async function getProducts() {
    const response = await fetch("./api/products");
    const data = await response.json();
    return data;
}

function addProductToCart(cid, pid) {
    let product = document.getElementById(`addtoCart-${pid}`);
    console.log(product);

    if (product)
        product.onclick = (e) => {
            e.preventDefault();

            const product = {
                id: pid,
            };

            //Hardcoded cart id

            fetch(`./api/carts/${cid}/product/${pid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        };
}

function deleteProductFromCart(cid, pid) {
    let product = document.getElementById(`deleteProduct-${pid}`);

    if (product)
        product.onclick = (e) => {
            e.preventDefault();

            fetch(`./api/carts/${cid}/product/${pid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        };
}

const main = async () => {
    let products = await getProducts();

    const idProducts = products.payload.map((product) => product.id);
    console.log(idProducts);
    idProducts.forEach((pid) => {
        //Hardcoded cart id
        const cid = "643d59a288b55263f2ade028";

        addProductToCart(cid, pid);
        deleteProductFromCart(cid, pid);
    });
};

main();
