const handleProductsRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  switch (method) {
    case "POST":
      if (url === "/api/products") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success create products!" }));
        return;
      }
      break;
    case "GET":
      if (url === "/api/products") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success Get All products!" }));
        return;
      }

      if (url === "/api/products/:id") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success Get products id!" }));
        return;
      }
      break;
    case "PATCH":
      if (url === "/api/products/:id") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success update products id!" }));
        return;
      }
      break;
    case "DELETE":
      if (url === "/api/products/:id") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success delete products id!" }));
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleProductsRoutes;
