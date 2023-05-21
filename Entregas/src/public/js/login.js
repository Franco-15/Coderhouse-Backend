const form = document.getElementById("loginForm");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    spinner.style.display = "block";

    let response = await fetch("/api/sessions/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });

    spinner.style.display = "none";

    let result = await response.json();

    if (result.status === "success") {
        window.location.href = "/products";
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Error",
            text: "Email o contraseña incorrectos",
        });
    }
});
