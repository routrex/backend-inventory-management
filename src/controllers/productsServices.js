import { createProductsServices } from "../services/productsServices.js";
import createProductsValidations from "../validations/productsValidations.js";

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
