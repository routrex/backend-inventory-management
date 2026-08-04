import { connectPostgreSql } from "../config/dbConfig.js";

export const findCategoryByName = async (nama) => {
  try {
    const query =
      "SELECT id, nama, deskripsi, created_at, updated_at FROM kategori where nama = $1";
    const values = [nama];

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

export const insertCategories = async (category) => {
  const {nama, deskripsi } = category;

  try {
    const query = "INSERT INTO kategori(nama, deskripsi) values ($1, $2) RETURNING *";
    const values = [nama, deskripsi];
    const result = await connectPostgreSql.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};
