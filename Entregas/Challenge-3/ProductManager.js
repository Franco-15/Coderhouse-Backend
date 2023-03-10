import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const products = await this.getProducts();
    if (
      !products.find((product) => product.code == code) &&
      title !== undefined &&
      description !== undefined &&
      price !== undefined &&
      thumbnail !== undefined &&
      code !== undefined &&
      stock !== undefined
    ) {
      let product = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      products.length
        ? (product.id = products[products.length - 1].id + 1)
        : (product.id = 1);
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
    } else console.log("Error. No pudo agregarse el producto");
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path);
      const products = JSON.parse(data);
      return products;
    } else return [];
  }

  async getProductByID(id) {
    const products = await this.getProducts();

    let product = products.find((product) => product.id == id);
    if (product) return product;
    else console.log("Error: Not found product");
  }

  async updateProduct(id, field, value) {
    const products = await this.getProducts();

    let productIndex = products.findIndex((product) => product.id == id);
    if (productIndex !== -1) {
      products[productIndex][field] = value;
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
    } else console.log("Error: Not found product to update");
  }

  async deleteProduct(id) {
    const products = await this.getProducts();

    let productPosicion = products.findIndex((product) => product.id == id);
    if (productPosicion !== -1) {
      products.splice(productPosicion, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
    } else console.log("Error: Not found product to delete");
  }
}