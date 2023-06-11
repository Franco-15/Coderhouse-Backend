async function getUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
}

async function getProducts() {
    const response = await fetch("/api/products");
    const data = await response.json();
    return data.payload;
}

function addProductToCart(cid, pid) {
    let product = document.getElementById(`pid-${pid}-cid-${cid}`);

    if (product)
        product.onclick = (e) => {
            e.preventDefault();

            const product = {
                quantity: 1,
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
            console.log(result);
            if (result.status === "error") {
                alert(result.message);
            }
        };
}

function deleteProduct(pid){
    let product = document.getElementById(`deleteProduct-${pid}`);

    if (product)
        product.onclick = async (e) => {
            e.preventDefault();
            const response = await fetch(`./api/products/${pid}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            console.log(result);
            if (result.status === "error") {
                alert(result.message);
            }
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
        deleteProduct(pid);
    });
};

main();
