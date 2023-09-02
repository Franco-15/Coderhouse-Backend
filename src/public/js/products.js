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

function addProductToCart(cid, product) {
    let addProductButton = document.getElementById(`pid-${product.id}-cid-${cid}`);

    const quantity = product.stock;
    let options = "";
    for (let i = 1; i <= quantity; i++) {
        options += `<option value="${i}">${i}</option>`;
    }
    const selectQuantity = document.getElementById(`selectQuantity-${product.id}`);
    if (selectQuantity)
        selectQuantity.innerHTML = `<select name="quantity">${options}</select>`;

    if (addProductButton)
        addProductButton.onclick = async (e) => {
            e.preventDefault();
            const quantitySelected = document.getElementById(`selectQuantity-${product.id}`).value;
            const response = await fetch(`/api/carts/${cid}/product/${product.id}`, {
                method: "POST",
                body: JSON.stringify({quantity: quantitySelected}),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Agregar producto al carrito",
                    text: "No se pudo agregar el producto al carrito",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Agregar producto al carrito",
                    text: "Se agrego el producto al carrito correctamente",
                });
            }
        };
}

const main = async () => {
    let products = await getProducts();
    let users = await getUsers();

    const usersId = users.payload.map((user) => user.cartId);
    const idProducts = products.payload.map((product) => product.id);


    products.payload.forEach((product) => {
        usersId.forEach((cid) => {
            addProductToCart(cid, product);
        });
    });
};

main();
