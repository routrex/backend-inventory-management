import {
  createProductsServices,
  deleteProductByIdServices,
  getAllProductsServices,
  getProductByIdServices,
  updateProductByIdService,
} from "../services/productsServices.js";
import {
  createProductsValidations,
  updatedProductsValidations,
} from "../validations/productsValidations.js";

export const getProductById = async (req, res, id) => {
  try {
    const findProductId = await getProductByIdServices(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Success Get product id ${id}!`,
        data: findProductId,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsServices();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Success Get All Products!",
        data: products,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Products Not Found" }));
  }
};

export const createProducts = (req, res) => {
  let data = [];

  req.on("data", (products) => {
    data.push(products);
  });

  req.on("end", async () => {
    const reqBody = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(reqBody);
      const validationProducts = createProductsValidations(parseData);

      if (validationProducts) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationProducts.message }));
        return;
      }

      await createProductsServices(parseData);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Success create products!",
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: err.message,
        }),
      );
    }
  });
};

export const updateProductById = (req, res, id) => {
  let data = [];

  req.on("data", (category) => {
    data.push(category);
  });

  req.on("end", async () => {
    const requestBody = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(requestBody);
      const validationUpdateProducts = updatedProductsValidations(parseData);

      if (validationUpdateProducts) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationUpdateProducts.message }));
        return;
      }

      const updateData = await updateProductByIdService(parseData, id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Success update product id ${id}`,
          data: updateData,
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
  });
};

export const deleteProductById = async (req, res, id) => {
  try {
      await deleteProductByIdServices(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Success delete product id ${id}!`,
        }),
      );
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
}
