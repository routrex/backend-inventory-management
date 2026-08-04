import {
  findCategoryById,
  findProductsByName,
  insertProducts,
} from "../repository/products.js";

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
