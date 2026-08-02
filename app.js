import http from "http";
import { tesDatabaseConnection } from "./src/config/dbConfig.js";
import handleRoutesCategories from "./src/routes/categoriesRoutes.js";
import handleProductsRoutes from "./src/routes/productsRoutes.js";
import handleStokProductRoutes from "./src/routes/stockProductsRoutes.js";

const port = process.env.PORT;

async function startServer() {
  try {
    await tesDatabaseConnection();
    const server = http.createServer((req, res) => {
      const url = req.url;
      if (url === "/api/categories") {
        handleRoutesCategories(req, res);
      } else if (url === "/api/products/stock") {
        handleStokProductRoutes(req, res);
      } else if (url === "/api/products") {
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
