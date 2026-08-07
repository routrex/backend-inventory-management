export const createStockInValidations = (data) => {
  const { quantity } = data;

  if (!quantity || quantity === null) {
    return new Error("quantity is required!");
  }

  if (isNaN(Number(quantity))) {
    return new Error("quantity must be a valid number!");
  }

  if (Number(quantity) < 0) {
    return new Error("quantity cannot be negative!");
  }
};

export const createStockOutValidations = (data) => {
  const { quantity } = data;

  if (!quantity || quantity === null) {
    return new Error("quantity is required!");
  }

  if (isNaN(Number(quantity))) {
    return new Error("quantity must be a valid number!");
  }

  if (Number(quantity) < 0) {
    return new Error("quantity cannot be negative!");
  }
};
