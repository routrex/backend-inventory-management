const handleStokProductRoutes = (req, res) => {
  const url = req.url;
  const segmentsUrl = url.split("/");
  const id = segmentsUrl[3];
  const stockIn = segmentsUrl[5] === "in";
  const stockOut = segmentsUrl[5] === "out";
  const getStockHistory = segmentsUrl[5] === "history";
  const getStockProductsId = segmentsUrl[4] === "stock";

  const method = req.method;

  switch (method) {
    case "POST":
      if (stockIn) {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Success create stock in for product id: ${id}!`,
          }),
        );
        return;
      }

      if (stockOut) {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Success create stock out for product id: ${id}!`,
          }),
        );
        return;
      }
      break;
    case "GET":
      if (getStockHistory) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Success get stock history for product id: ${id}!`,
          }),
        );
        return;
      }

      if (getStockProductsId) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `Success get stock for product id: ${id}!`,
          }),
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
