import http from "http";
import { tesDatabaseConnection } from "./src/config/dbConfig.js";
import handleRoutesCategories from "./src/routes/categoriesRoutes.js";
import handleProductsRoutes from "./src/routes/productsRoutes.js";
import stockRoutes from "./src/routes/riwayatStockRoutes.js";

const port = process.env.PORT;

async function startServer() {
  try {
    await tesDatabaseConnection();
    const server = http.createServer((req, res) => {
      const url = req.url;
      const segmentsUrl = url.split("/");
      const isCategoriesRoute =
        segmentsUrl[1] === "api" && segmentsUrl[2] === "categories";

      const isProductStockRoute =
        segmentsUrl[1] === "api" &&
        segmentsUrl[2] === "products" &&
        segmentsUrl.includes("stock");

      const isProductRoute =
        segmentsUrl[1] === "api" &&
        segmentsUrl[2] === "products" &&
        !segmentsUrl.includes("stock");

      if (isCategoriesRoute) {
        handleRoutesCategories(req, res);
      } else if (isProductStockRoute) {
        stockRoutes(req, res);
      } else if (isProductRoute) {
        handleProductsRoutes(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Page Not Found" }));
      }
    });

    server.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer();
