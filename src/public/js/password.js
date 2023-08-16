const newPassword = document.getElementById("newPassword");
const form = document.getElementById("forgotPasswordForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const obj = {};

        data.forEach((value, key) => (obj[key] = value));

        let response = await fetch("/restorePassword", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "Content-Type": "application/json",
            },
        });

        let result = await response.json();
        if (result.status === "error") {
            Swal.fire({
                icon: "error",
                title: "Error al restaurar contraseña",
                text: "El email ingresado no existe",
            });
        } else {
            Swal.fire({
                icon: "success",
                title: "Email de restauración de constraseña",
                text: "Se ha enviado un email a su correo electrónico",
            });
        }
    });
}

if (newPassword) {
    newPassword.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(newPassword);
        const obj = {};

        data.forEach((value, key) => (obj[key] = value));

        if (obj["password"] !== obj["repeatPassword"]) {
            Toastify({
                text: "Las contraseñas no coinciden",
                duration: 1500,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "Red",
                },
            }).showToast();
        } else {
            let response = await fetch(`/api/users/${obj["userId"]}`, {
                method: "PUT",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            let result = await response.json();
            if (result.status === "error") {
                Swal.fire({
                    icon: "error",
                    title: "Error al restaurar contraseña",
                    text: `${result.message}`,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Restauración de constraseña",
                    text: "Su contraseña ha sido modificada exitosamente",
                });
            }
        }
    });
}
