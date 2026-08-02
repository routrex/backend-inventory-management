const handleStokProductRoutes = (req, res) => {
  const url = req.url;
  const method = req.method;

  switch (method) {
    case "POST":
      if (url === "/api/products/:id/stock-in") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success create stock in!" }));
        return;
      }

      if (url === "/api/products/:id/stock-out") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success create stock out!" }));
        return;
      }
      break;
    case "GET":
      if (url === "/api/products/:id/stock") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success Get products id stock!" }));
        return;
      }

      if (url === "/api/products/:id/stock-history") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Success Get products id history stock!" }),
        );
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleStokProductRoutes;
