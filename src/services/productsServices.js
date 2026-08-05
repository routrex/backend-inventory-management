import {
  deleteProductById,
  findCategoryById,
  findProductById,
  findProductsByName,
  getAllProducts,
  insertProducts,
  updateProductById,
} from "../repository/products.js";

export const getProductByIdServices = async (id) => {
  const id_product = await findProductById(id);
  if (!id_product) {
    throw new Error("Product ID does not exist.");
  }

  return id_product;
};

export const getAllProductsServices = async () => {
  const products = await getAllProducts();
  return products;
};

export const createProductsServices = async (data) => {
  const { nama_produk, deskripsi, harga, kategori_id } = data;

  const existingProduct = await findProductsByName(nama_produk);
  const category = await findCategoryById(kategori_id);

  if (existingProduct) {
    throw new Error("Products already exists!");
  }

  if (!category) {
    throw new Error("Category ID does not exist.");
  }

  const product = {
    nama_produk,
    deskripsi,
    harga,
    kategori_id,
  };

  return await insertProducts(product);
};

export const updateProductByIdService = async (data, id) => {
  const { nama_produk } = data;
  const existingProduct = await findProductById(id);

  if (!existingProduct) {
    throw new Error("Product ID does not exist.");
  }

  const updateProduct = {
    ...existingProduct,
    ...data,
  };

  if (nama_produk != null) {
    const existingProductName = await findProductsByName(nama_produk);
    if (existingProductName && existingProductName.id !== Number(id)) {
      throw new Error("Name is already in use");
    }
  }

  const updatedpProduct = await updateProductById(updateProduct, id);

  return updatedpProduct;
};

export const deleteProductByIdServices = async (id) => {
  try {
    const id_product = await findProductById(id);
    if (!id_product) {
      throw new Error("Product ID does not exist.");
    }

    return await deleteProductById(id);
  } catch (err) {
    throw err;
  }
};
