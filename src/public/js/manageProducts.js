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

function updateProduct(pid) {
    let updateProductForm = document.getElementById(`updateProductForm`);
    const updateProductButton = document.getElementById("updateProductButton");

    if (updateProductForm)
        updateProductButton.onclick = async (e) => {
            e.preventDefault();

            const data = new FormData(updateProductForm);

            const response = await fetch(`./api/products/${pid}`, {
                method: "PUT",
                body: data
            });
            const result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Actualizacion de producto",
                    text: "No se pudo actualizar el producto",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Actualizacion de producto",
                    text: "Se actualizo el producto correctamente",
                });
            }
        };
}

function deleteProduct(pid) {
    let product = document.getElementById(`deleteProduct-${pid}`);
    if (product)
        product.onclick = async (e) => {
            e.preventDefault();
            const response = await fetch(`./api/products/${pid}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Eliminacion de producto",
                    text: "No se pudo eliminar el producto",
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Eliminacion de producto",
                    text: "Se elimino el producto correctamente",
                });
            }
        };
}

const form = document.getElementById("newProduct");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(`./api/products`, {
        method: "POST",
        body: data,
    });
    const result = await response.json();
    if (result.status === "error") {
        Swal.fire({
            icon: "error",
            title: "Creacion de producto",
            text: "No se pudo crear el producto",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Creacion de producto",
            text: "Se creo el producto correctamente",
        });
    }
});

const main = async () => {
    let products = await getProducts();
    let users = await getUsers();

    const selectProduct = document.getElementById("selectProduct");
    if (selectProduct) {
        selectProduct.innerHTML = `
        <option value="0">Seleccione un producto</option>
        ${products.payload.map((product) => {
            return `<option value="${product.id}">${product.title}</option>`;
        })}
        `;
    }

    selectProduct.onchange = (e) => {
        const pid = e.target.value;
        const product = products.payload.find((product) => product.id == pid);

        if (product) {
            const productInfo = document.getElementById("productInfo");
            productInfo.innerHTML = `
        <form id="updateProductForm" enctype="multipart/form-data">
            <div class="form-group" style="margin-top: 20px;">
                <label for="title">Título</label>
                <input type="text" name="title" class="form-control" id="title" value="${product.title}">
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="description">Descripción</label>
                <input type="text" name="description" class="form-control" id="description" value="${product.description}">
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="code">Codigo</label>
                <input type="text" name="code" class="form-control" id="code" value="${product.code}">
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="price">Precio</label>
                <input type="number" name="price" class="form-control" id="price" value="${product.price}">
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="stock">Stock</label>
                <input type="number" name="stock" class="form-control" id="stock" value="${product.stock}">
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="category">Categoría</label>
                <input type="text" name="category" class="form-control" id="category" value="${product.category}">
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="owner">Propietario</label>
                <input type="text" name="owner" class="form-control" id="owner" value="${product.owner}" readonly>
            </div>
            <div class="form-group" style="margin-top: 20px;">
                <label for="thumbnails">Imagenes</label>
                <input type="file" name="thumbnails" class="form-control" id="img" value="${product.thumbnails}" multiple accept="image/*">
            </div>
            <button type="submit" class="btn btn-primary" id="updateProductButton">Guardar</button>
        </form>

        <button type="submit" class="btn btn-danger" id="deleteProduct-${product.id}">Eliminar</button>
        `;

            updateProduct(product.id);
            deleteProduct(product.id);
        } else {
            productInfo.innerHTML = "";
        }
    };
};

main();
