const createCategoriesValidations = (data) => {
  const { nama, deskripsi } = data;

  if (!nama || nama.trim() === "") {
    return new Error("Name is required!");
  }

  if (!deskripsi || deskripsi.trim() === "") {
    return new Error("Description is required!");
  }
};

export default createCategoriesValidations;
