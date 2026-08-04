const createProductsValidations = (data) => {
  const { nama_produk, deskripsi, harga, kategori_id } = data;

  if (!nama_produk || nama_produk.trim() === "") {
    return new Error("Name is required!");
  }

  if (!deskripsi || deskripsi.trim() === "") {
    return new Error("Description is required!");
  }

  if (!harga || harga === null) {
    return new Error("Price is required!");
  }

  if (isNaN(Number(harga))) {
    return new Error("Price must be a valid number!");
  }

  if (Number(harga) < 0) {
    return new Error("Price cannot be negative!");
  }

  // if (!stok || stok.trim() === "") {
  //   return new Error("Stock is required!");
  // }

  // if (!stok || stok === "") {
  //   if (isNaN(Number(stok))) {
  //     return new Error("Stock must be a valid number!");
  //   }

  //   if (Number(stok) < 0) {
  //     return new Error("Stock cannot be negative!");
  //   }
  // }

  if (!kategori_id || kategori_id === null) {
    return new Error("Category Id is required!");
  }

  if (isNaN(Number(kategori_id))) {
    return new Error("Category Id must be a valid number!");
  }
};

export default createProductsValidations;
