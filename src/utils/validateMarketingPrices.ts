import { CsvProduct } from "../interfaces/csvProduct";
import { LineErrors } from "../interfaces/lineErrors";
import { DbProduct } from "../interfaces/dbProduct";

const validateMarketingPrices = (
  csvData: CsvProduct[],
  dbProducts: DbProduct[],
  lineErrors: LineErrors[]
) => {
  const invalidCodes: LineErrors[] = [];
  const message =
    "Reajuste maior ou menor do que 10% do preço de venda atual do produto";
  csvData.forEach((product) => {
    const dbProduct = dbProducts.find((i) => i.code === product.code);
    if (
      Math.abs(product.newPrice - Number(dbProduct?.salesPrice)) >
      Number(dbProduct?.salesPrice) * 0.1
    ) {
      const error = lineErrors.find((i) => i.code === product.code);

      if (error) {
        if (!error.message?.includes(message)) {
          error.message?.push(message);
        }
      } else {
        invalidCodes.push({
          code: product.code,
          message: [message],
        });
      }
    }
  });
  return [...lineErrors, ...invalidCodes];
};

export default validateMarketingPrices;
