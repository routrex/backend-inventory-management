import { categoriesEnums } from "../constants/categoriesEnums.js";

const createCategoriesValidations = (data) => {
  const { nama, deskripsi } = data;

  if (!nama || nama.trim() === "") {
    return new Error("Name is required!");
  }

  if (!categoriesEnums.includes(nama)) {
    return new Error(
      "Invalid category name. Allowed values are: Alat Tulis, Olahraga, Elektronik",
    );
  }

  if (!deskripsi || deskripsi.trim() === "") {
    return new Error("Description is required!");
  }
};

export default createCategoriesValidations;
