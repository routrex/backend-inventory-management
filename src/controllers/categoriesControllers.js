import {
  createCategoriesServices,
  deleteCategoryByIdServices,
  getAllCategoryServices,
  getCategoryByIdServices,
  updateCategoryByIdService,
} from "../services/categoriesServices.js";
import createCategoriesValidations from "../validations/categoriesValidations.js";

export const getCategoryById = async (req, res, id) => {
  try {
    const findCategoryId = await getCategoryByIdServices(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Success Get category id ${id}!`,
        data: findCategoryId,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const kategori = await getAllCategoryServices();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Success Get All categories!",
        data: kategori,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Categories Not Found" }));
  }
};

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

export const updateCategoryById = (req, res, id) => {
  let data = [];

  req.on("data", (category) => {
    data.push(category);
  });

  req.on("end", async () => {
    const requestBody = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(requestBody);

      const updateData = await updateCategoryByIdService(parseData, id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: `Success update category id ${id}`,
          data: updateData,
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
  });
};

export const deleteCategoryById = async (req, res, id) => {
  try {
    await deleteCategoryByIdServices(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Success delete categories id ${id}!`,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};
