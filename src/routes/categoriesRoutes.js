import {
  createCategories,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoriesControllers.js";

const handleRoutesCategories = (req, res) => {
  const url = req.url;
  const segmentsUrl = url.split("/");
  const mainRoutes =
    segmentsUrl.length === 3 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "categories";
  const isCategoryIdRoute =
    segmentsUrl.length === 4 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "categories";
  const id = segmentsUrl[3];
  const method = req.method;

  switch (method) {
    case "POST":
      if (mainRoutes) {
        createCategories(req, res);
        return;
      }
      break;
    case "GET":
      if (mainRoutes) {
        getAllCategory(req, res);
        return;
      }

      if (isCategoryIdRoute) {
        getCategoryById(req, res, id);
        return;
      }
      break;
    case "PATCH":
      if (isCategoryIdRoute) {
        updateCategoryById(req, res, id);
        return;
      }
      break;
    case "DELETE":
      if (isCategoryIdRoute) {
        deleteCategoryById(req, res, id)
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleRoutesCategories;
