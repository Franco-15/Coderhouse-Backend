class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      !this.products.find((product) => product.code == code) &&
      title !== undefined &&
      description !== undefined &&
      price !== undefined &&
      thumbnail !== undefined &&
      code !== undefined &&
      stock !== undefined
    ) {
      this.products.push({
        id: this.products.length,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      });
    } else console.log("Error. No pudo agregarse el producto");
  }

  getProducts() {
    return this.products;
  }

  getProductByID(id) {
    let product = this.products.find((product) => product.id == id);
    if (product) return product;
    else console.log("Error: Not found product");
  }
}