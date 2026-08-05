import { connectPostgreSql } from "../config/dbConfig.js";

export const getAllCategories = async () => {
  try {
    const query =
      "SELECT id, nama, deskripsi, created_at, updated_at FROM kategori";

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
  const { nama, deskripsi } = category;

  try {
    const query =
      "INSERT INTO kategori(nama, deskripsi) values ($1, $2) RETURNING *";
    const values = [nama, deskripsi];
    const result = await connectPostgreSql.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const updateCategoryById = async (updateCategory, id) => {
  const { nama, deskripsi } = updateCategory;
  try {
    const query =
      "UPDATE kategori SET nama = $1, deskripsi = $2, updated_at = NOW() where id = $3 RETURNING *";
    const values = [nama, deskripsi, id];
    const result = await connectPostgreSql.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const query =
      "DELETE FROM kategori where id = $1 RETURNING *";
    const values = [id];
    const result = await connectPostgreSql.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}
