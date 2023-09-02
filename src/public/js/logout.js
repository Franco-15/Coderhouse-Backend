const logoutButton = document.getElementById("logout");

logoutButton.onclick = async () =>{
    let response = await fetch("/api/sessions/logout", {
        method: "GET",
    });

    let result = await response.json();

    if (result.status === "success") {
        window.location.href = "/login";
    } else {
        Swal.fire({
            icon: "error",
            title: "Logout Error",
            text: "Se produjo un error al cerrar la sesión",
        });
    }
}
