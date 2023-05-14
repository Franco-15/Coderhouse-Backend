const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    let response = await fetch("/api/sessions/register", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    let result = await response.json();
    if (result.status === "success") {
        Swal.fire({
            title: "Register Success",
            icon: "success",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Ir a Login",
            cancelButtonText: "Cancelar",
        }).then((resultSwal) => {
            if (resultSwal.isConfirmed) {
                window.location.href = "/login";
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Register Error",
            text: result.error || "Register error",
        });
    }
});
