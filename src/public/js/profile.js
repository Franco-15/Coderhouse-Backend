async function getUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data;
}

const loadData = async (e, uid) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (data.values().next().value.name === "") {
        Swal.fire({
            icon: "error",
            title: "Carga de documento",
            text: "Debe cargar un documento",
        });
        return;
    }
    const response = await fetch(`./api/users/${uid}/documents`, {
        method: "POST",
        body: data,
    });
    const result = await response.json();
    if (result.status === "error") {
        Swal.fire({
            icon: "error",
            title: "Carga de documento",
            text: "No se pudo cargar el documento",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Carga de documento",
            text: "Se cargo el documento correctamente",
        });
    }
}

const updateRole = async (e, uid) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const obj = {};
    data.forEach((value, key) => {
        obj[key] = value;
    });

    const response = await fetch(`./api/users/premium/${uid}`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    if (result.status === "error") {
        Swal.fire({
            icon: "error",
            title: "Cambio de rol",
            text: `No se pudo cambiar el rol: ${result.message}`,
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Cambio de rol",
            text: "Se cambio el rol correctamente",
        });
    }
}

const main = async () => {
    let users = await getUsers();

    users.payload.forEach((user) => {
        const identification = document.getElementById(`identification-${user.id}`);
        const direction = document.getElementById(`direction-${user.id}`);
        const accountStatus = document.getElementById(`accountStatus-${user.id}`);
        const changeRole = document.getElementById(`changeRole-${user.id}`);

        if (identification)
            identification.addEventListener("submit", (e) => loadData(e, user.id));

        if (direction)
            direction.addEventListener("submit", (e) => loadData(e, user.id));

        if (accountStatus)
            accountStatus.addEventListener("submit", (e) => loadData(e, user.id));
        
        if (changeRole){
            changeRole.addEventListener("submit", (e) => updateRole(e, user.id));
        }
        });
};

main();