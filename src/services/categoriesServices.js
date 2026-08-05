import {
  deleteCategoryById,
  findCategoryByName,
  getAllCategories,
  insertCategories,
  updateCategoryById,
} from "../repository/categories.js";
import { findCategoryById } from "../repository/products.js";

export const getCategoryByIdServices = async (id) => {
  const id_category = await findCategoryById(id);
  if (!id_category) {
    throw new Error("Category ID does not exist.");
  }

  return id_category;
};

export const getAllCategoryServices = async () => {
  const categories = await getAllCategories();
  return categories;
};

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

export const updateCategoryByIdService = async (data, id) => {
  const { nama } = data;
  const existingCategory = await findCategoryById(id);

  if (!existingCategory) {
    throw new Error("Category ID does not exist.");
  }

  const updateCategory = {
    ...existingCategory,
    ...data,
  };

  if (nama != null) {
    const existingCategoryName = await findCategoryByName(nama);
    if (existingCategoryName && existingCategoryName.id !== Number(id)) {
      throw new Error("Name is already in use");
    }
  }

  const updatedCategory = await updateCategoryById(updateCategory, id);

  return updatedCategory;
};

export const deleteCategoryByIdServices = async (id) => {
  try {
    const id_category = await findCategoryById(id);
    if (!id_category) {
      throw new Error("Category ID does not exist.");
    }

    return await deleteCategoryById(id);
  } catch (err) {
    throw err;
  }
};
