const handleRoutesCategories = (req, res) => {
  const url = req.url;
  const method = req.method;

  switch (method) {
    case "POST":
      if (url === "/api/categories") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success create categories!" }));
        return;
      }
      break;
    case "GET":
      if (url === "/api/categories") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success Get All categories!" }));
        return;
      }

      if (url === "/api/categories/:id") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success Get categories id!" }));
        return;
      }
      break;
    case "PATCH":
      if (url === "/api/categories/:id") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success update categories id!" }));
        return;
      }
      break;
    case "DELETE":
      if (url === "/api/categories/:id") {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success delete categories id!" }));
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleRoutesCategories;
