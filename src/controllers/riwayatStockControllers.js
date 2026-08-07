import {
  createStockInServices,
  createStockOutServices,
  getStockHistoryByProductIdServices,
  getStockProductIdServices,
} from "../services/riwayatStockServices.js";
import {
  createStockInValidations,
  createStockOutValidations,
} from "../validations/riwayatStockValidations.js";

export const getStockProductId = async (req, res, id) => {
  try {
    const stockProduct = await getStockProductIdServices(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Success Get Stock Product!",
        data: stockProduct,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message }));
  }
};

export const getStockHistoryByProductId = async (req, res, id) => {
  try {
    const stockHistory = await getStockHistoryByProductIdServices(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Success Get Stock In or Out History!",
        data: stockHistory,
      }),
    );
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: err.message}));
  }
};

export const createStokInProduct = (req, res, id) => {
  let data = [];

  req.on("data", (products) => {
    data.push(products);
  });

  req.on("end", async () => {
    const reqBody = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(reqBody);
      const validationStockIn = createStockInValidations(parseData);

      if (validationStockIn) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationStockIn.message }));
        return;
      }

      const riwayatStock = await createStockInServices(parseData, id);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Success create History Stock In!",
          data: riwayatStock,
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: err.message,
        }),
      );
    }
  });
};

export const createStokOutProduct = (req, res, id) => {
  let data = [];

  req.on("data", (products) => {
    data.push(products);
  });

  req.on("end", async () => {
    const reqBody = Buffer.concat(data).toString();

    try {
      const parseData = JSON.parse(reqBody);
      const validationStockOut = createStockOutValidations(parseData);

      if (validationStockOut) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: validationStockOut.message }));
        return;
      }

      const riwayatStock = await createStockOutServices(parseData, id);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Success create History Stock Out!",
          data: riwayatStock,
        }),
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: err.message,
        }),
      );
    }
  });
};
