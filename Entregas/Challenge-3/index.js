import ProductManager from "./productManager.js";

const manager = new ProductManager("./files/products.json");

const main = async () => {
  await manager.addProduct(
    "producto 1",
    "Este es un producto 1",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await manager.addProduct(
    "producto 2",
    "Este es un producto 2",
    200,
    "Sin imagen",
    "abc124",
    25
  );
  await manager.addProduct(
    "producto 3",
    "Este es un producto 3",
    200,
    "Sin imagen",
    "abc125",
    25
  );
  await manager.addProduct(
    "producto 4",
    "Este es un producto 4",
    200,
    "Sin imagen",
    "abc126",
    25
  );
  await manager.addProduct(
    "producto 5",
    "Este es un producto 5",
    200,
    "Sin imagen",
    "abc127",
    25
  );
  await manager.addProduct(
    "producto 6",
    "Este es un producto 6",
    200,
    "Sin imagen",
    "abc128",
    25
  );
  await manager.addProduct(
    "producto 7",
    "Este es un producto 7",
    200,
    "Sin imagen",
    "abc129",
    25
  );
  await manager.addProduct(
    "producto 8",
    "Este es un producto 8",
    200,
    "Sin imagen",
    "abc130",
    25
  );
  await manager.addProduct(
    "producto 9",
    "Este es un producto 9",
    200,
    "Sin imagen",
    "abc131",
    25
  );
  await manager.addProduct(
    "producto 10",
    "Este es un producto 10",
    200,
    "Sin imagen",
    "abc132",
    25
  );
};

main();
