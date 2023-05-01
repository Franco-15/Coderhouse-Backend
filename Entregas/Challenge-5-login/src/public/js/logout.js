const logoutButton = document.getElementById("logout");

logoutButton.onclick = async () =>{
    let response = await fetch("/api/sessions/logout", {
        method: "GET",
    });

    let result = await response.json();

    console.log(result);

    if (result.status === "success") {
        window.location.href = "/login";
    } else {
        Swal.fire({
            icon: "error",
            title: "Login Error",
            text: "Email o contraseña incorrectos",
        });
    }
}
