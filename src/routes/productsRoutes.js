import {
  createProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/productsControllers.js";

const handleProductsRoutes = (req, res) => {
  const url = req.url;
  const segmentsUrl = url.split("/");
  const mainRoutes =
    segmentsUrl.length === 3 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "products";
  const isProductsIdRoute =
    segmentsUrl.length === 4 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "products";
  const id = segmentsUrl[3];
  const method = req.method;

  switch (method) {
    case "POST":
      if (mainRoutes) {
        createProducts(req, res);
        return;
      }
      break;
    case "GET":
      if (mainRoutes) {
        getAllProducts(req, res);
        return;
      }

      if (isProductsIdRoute) {
        getProductById(req, res, id);
        return;
      }
      break;
    case "PATCH":
      if (isProductsIdRoute) {
        updateProductById(req, res, id);
        return;
      }
      break;
    case "DELETE":
      if (isProductsIdRoute) {
        deleteProductById(req, res, id);
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleProductsRoutes;
