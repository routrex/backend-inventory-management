import { connectPostgreSql } from "../config/dbConfig.js";

export const getStockHistoryByIdProduct = async (id) => {
  try {
    const query =
      "SELECT produk.id, produk.nama_produk, riwayat_stok.type, riwayat_stok.quantity FROM riwayat_stok JOIN produk ON riwayat_stok.produk_id = produk.id where produk_id = $1 ORDER BY riwayat_stok.updated_at DESC";
    const values = [id];

    const result = await connectPostgreSql.query(query, values);

    if (result.rows.length > 0) {
      return result.rows;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};

export const createStockHistory = async (stokData, client) => {
  const { produk_id, type, quantity } = stokData;

  try {
    const query =
      "INSERT INTO riwayat_stok(produk_id, type, quantity) values ($1, $2, $3) RETURNING *";
    const values = [produk_id, type, quantity];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
