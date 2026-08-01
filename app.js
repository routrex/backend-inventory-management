import http from "http";
import { tesDatabaseConnection } from "./src/config/dbConfig.js";

const port = process.env.PORT;

async function startServer() {
  try {
    await tesDatabaseConnection();
    const server = http.createServer((req, res) => {});

    server.listen(port, () => {
      console.log("Server running on port", port);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer()
