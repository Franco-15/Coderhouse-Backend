async function getUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
}

async function getProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data;
}

function addProductToCart(cid, pid) {
    let product = document.getElementById(`pid-${pid}-cid-${cid}`);
    console.log(cid);
    console.log(pid);
    console.log(product);
    if (product)
        product.onclick = (e) => {
            e.preventDefault();

            const product = {
                quantity: -1,
            };

            fetch(`/api/carts/${cid}/product/${pid}`, {
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
    let users = await getUsers();
    const usersId = users.payload.map((user) => user.cartId);
    const idProducts = products.payload.map((product) => product.id);

    idProducts.forEach((pid) => {
        usersId.forEach((cid) => {
            addProductToCart(cid, pid);
            deleteProductFromCart(cid, pid);
        });
    });
};

main();
