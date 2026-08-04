import {
  findCategoryByName,
  insertCategories,
} from "../repository/categories.js";

export const createCategoriesServices = async (data) => {
  const { nama, deskripsi } = data;

  const existingData = await findCategoryByName(nama);

  if (existingData) {
    throw new Error("Category already exists!");
  }

  const category = {
    nama,
    deskripsi,
  };

  return await insertCategories(category);
};
