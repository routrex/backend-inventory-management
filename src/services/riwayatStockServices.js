import { connectPostgreSql } from "../config/dbConfig.js";
import { findProductById, updateStokProduct } from "../repository/products.js";
import {
  createStockHistory,
  getStockHistoryByIdProduct,
} from "../repository/riwayatStock.js";

export const getStockProductIdServices = async (id) => {
  const existingProduct = await findProductById(id);

  if (!existingProduct) {
    throw new Error("Product ID does not exist!");
  }

  return existingProduct;
};

export const getStockHistoryByProductIdServices = async (id) => {
  const existingProduct = await findProductById(id);

  if (!existingProduct) {
    throw new Error("Product ID does not exist!");
  }

  const stockHistory = await getStockHistoryByIdProduct(id);
  return stockHistory;
};

export const createStockInServices = async (data, id) => {
  const { quantity } = data;
  const client = await connectPostgreSql.connect();

  try {
    await client.query("START TRANSACTION");
    const existingProduct = await findProductById(id, client);

    if (!existingProduct) {
      throw new Error("Product ID does not exist.");
    }

    if (quantity < existingProduct.stok) {
      throw new Error("The quantity must be greater than the current stock!");
    }

    const updateStok = existingProduct.stok + Number(quantity);

    await updateStokProduct(id, updateStok, client);
    await createStockHistory({ produk_id: id, type: "IN", quantity }, client);
    await client.query("COMMIT");
    return {
      id_product: Number(id),
      stok: updateStok,
      quantity,
      type: "IN",
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const createStockOutServices = async (data, id) => {
  const { quantity } = data;
  const client = await connectPostgreSql.connect();

  try {
    await client.query("START TRANSACTION");
    const existingProduct = await findProductById(id, client);

    if (!existingProduct) {
      throw new Error("Product ID does not exist.");
    }

    if (quantity > existingProduct.stok) {
      throw new Error("Stock is not enough!");
    }

    const updateStok = existingProduct.stok - Number(quantity);

    await updateStokProduct(id, updateStok, client);
    await createStockHistory({ produk_id: id, type: "OUT", quantity }, client);
    await client.query("COMMIT");
    return {
      id_product: Number(id),
      stok: updateStok,
      quantity,
      type: "OUT",
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};
