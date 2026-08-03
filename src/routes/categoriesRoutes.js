const handleRoutesCategories = (req, res) => {
  const url = req.url;
  const segmentsUrl = url.split("/");
  const mainRoutes =
    segmentsUrl.length === 3 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "categories";
  const routesId =
    segmentsUrl.length === 4 &&
    segmentsUrl[1] === "api" &&
    segmentsUrl[2] === "categories";
  const id = segmentsUrl[3];
  const method = req.method;

  switch (method) {
    case "POST":
      if (mainRoutes) {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success create categories!" }));
        return;
      }
      break;
    case "GET":
      if (mainRoutes) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Success Get All categories!" }));
        return;
      }

      if (routesId) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: `Success Get categories id ${id}!` }),
        );
        return;
      }
      break;
    case "PATCH":
      if (routesId) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: `Success update categories id ${id}!` }),
        );
        return;
      }
      break;
    case "DELETE":
      if (routesId) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: `Success delete categories id ${id}!` }),
        );
        return;
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Method not allowed!" }));
  }
};

export default handleRoutesCategories;
