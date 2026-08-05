import {
  createProductsServices,
  getAllProductsServices,
  getProductByIdServices,
} from "../services/productsServices.js";
import createProductsValidations from "../validations/productsValidations.js";

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

export default createProducts;
