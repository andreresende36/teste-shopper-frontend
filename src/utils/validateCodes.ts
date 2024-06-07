import { CsvProduct } from "../interfaces/csvProduct";
import { LineErrors } from "../interfaces/lineErrors";

const validateCodes = (csvData: CsvProduct[]) => {
  const productCodes = new Set<number>();
  const invalidCodes: LineErrors[] = [];

  csvData.forEach((product) => {
    if (productCodes.has(product.code)) {
      if (!invalidCodes.some((i) => i.code === product.code)) {      
        invalidCodes.push({
          code: product.code,
          message: ['Código de produto repetido']
        });
      }
    } else {
      productCodes.add(product.code);
    }
  });
  return invalidCodes;
};

export default validateCodes;
