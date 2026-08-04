import { createCategoriesServices } from "../services/categoriesServices.js";
import createCategoriesValidations from "../validations/categoriesValidations.js";

export const createCategories = (req, res) => {
  let data = [];

  req.on("data", (categories) => {
    data.push(categories);
  });

  req.on("end", async () => {
    const requestBody = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(requestBody);
      const validationsCategories = createCategoriesValidations(parseData);

      if (validationsCategories) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationsCategories.message }));
        return;
      }

      await createCategoriesServices(parseData);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Success create categories!" }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
  });
};
