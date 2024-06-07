import { DbProduct } from "../interfaces/dbProduct";
import { CsvProduct } from "../interfaces/csvProduct";
import { LineErrors } from "../interfaces/lineErrors";

const validateExistsOnDb = (
  csvData: CsvProduct[],
  dbProducts: DbProduct[],
  lineErrors: LineErrors[]
) => {
  const invalidCodes: LineErrors[] = [];
  const MESSAGE =
  "Código de produto inválido ou não encontrado no banco de dados";
  csvData.forEach((product) => {
    const dbProduct = dbProducts.find((i) => i.code === product.code);
    if (!dbProduct) {
      const error = lineErrors.find((i) => i.code === product.code);
      if (error) {
        if (!error.message?.includes(MESSAGE)) {
          error.message?.push(MESSAGE);
        }
      } else {
        invalidCodes.push({
          code: product.code,
          message: [MESSAGE],
        });
      }
    }
  });
  return [...lineErrors, ...invalidCodes];
};

export default validateExistsOnDb;
