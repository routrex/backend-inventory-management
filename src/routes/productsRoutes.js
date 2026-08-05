import  {
  createProducts,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/productsServices.js";

const handleProductsRoutes = (req, res) => {
  const url = req.url;
  const segmentsUrl = url.split("/");
  const mainRoutes =
    segmentsUrl.length === 3 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "products";
  const routesId =
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

      if (routesId) {
        getProductById(req, res, id);
        return;
      }
      break;
    case "PATCH":
      if (routesId) {
        updateProductById(req, res, id);
        return;
      }
      break;
    case "DELETE":
      if (routesId) {

        deleteProductById(req, res, id)
        // res.writeHead(200, { "Content-Type": "application/json" });
        // res.end(
        //   JSON.stringify({ message: `Success delete products id ${id}` }),
        // );
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleProductsRoutes;
