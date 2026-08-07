import {
  createStokInProduct,
  createStokOutProduct,
  getStockHistoryByProductId,
  getStockProductId,
} from "../controllers/riwayatStockControllers.js";

const stockRoutes = (req, res) => {
  const url = req.url;
  const segmentsUrl = url.split("/");
  const id = segmentsUrl[3];
  const stockIn = segmentsUrl[5] === "in";
  const stockOut = segmentsUrl[5] === "out";
  const getStockProductsId = segmentsUrl[4] === "stock";
  const getStockHistory = segmentsUrl[5] === "history";

  const method = req.method;

  switch (method) {
    case "POST":
      if (stockIn) {
        createStokInProduct(req, res, id);
        return;
      }

      if (stockOut) {
        createStokOutProduct(req, res, id);
        return;
      }
      break;
    case "GET":
      if (getStockHistory) {
        getStockHistoryByProductId(req, res, id);
        return;
      }

      if (getStockProductsId) {
        getStockProductId(req, res, id);
        return;
      }

      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default stockRoutes;
