const form = document.getElementById("createProduct");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    try {
        let response = await fetch("/api/products/", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        let result = await response.json();
        if (result.status === "success") {
            Swal.fire({
                title: "Producto Creado Exitosamente",
                icon: "success",
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Error creando el producto",
                text: result.cause,
            });
        }
    } catch (error) {
        console.log(error);
    }
});
