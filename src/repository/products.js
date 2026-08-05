import { connectPostgreSql } from "../config/dbConfig.js";

export const findProductById = async (id) => {
  try {
    const query =
      "SELECT id, nama_produk, deskripsi, harga, kategori_id, created_at, updated_at FROM produk where id = $1";
    const values = [id];
    const result = await connectPostgreSql.query(query, values);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async () => {
  try {
    const query =
      "SELECT id, nama_produk, deskripsi, harga, kategori_id, created_at, updated_at FROM produk";

    const result = await connectPostgreSql.query(query);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const findProductsByName = async (nama_produk) => {
  try {
    const query = "SELECT nama_produk FROM produk where nama_produk = $1";
    const values = [nama_produk];

    const result = await connectPostgreSql.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const findCategoryById = async (kategori_id) => {
  try {
    const query = "SELECT id, nama, deskripsi FROM kategori where id = $1";
    const values = [kategori_id];

    const result = await connectPostgreSql.query(query, values);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const insertProducts = async (product) => {
  const { nama_produk, deskripsi, harga, kategori_id } = product;

  try {
    const query =
      "INSERT INTO produk(nama_produk, deskripsi, harga, kategori_id) values ($1, $2, $3, $4) RETURNING *";
    const values = [nama_produk, deskripsi, harga, kategori_id];
    const result = await connectPostgreSql.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
