import { CsvProduct } from "../interfaces/csvProduct";
import { LineErrors } from "../interfaces/lineErrors";
import { DbPack } from "../interfaces/dbPack";
import { DbProduct } from "../interfaces/dbProduct";

const validatePacksPrices = (
  csvData: CsvProduct[],
  dbPacks: DbPack[],
  dbProducts: DbProduct[],
  lineErrors: LineErrors[],
) => {
  const invalidCodes = new Set<LineErrors>();

  csvData.forEach((product) => {
    const packs = dbPacks.filter(
      (pack) => pack.packId === product.code
    ) as DbPack[];
    if (packs.length === 0) return;

    const productsOnPack = packs.map((pack) => ({
      productId: pack.productId,
      qty: pack.qty,
    }));
    const sumProductsPrices = productsOnPack.reduce((acc, code) => {
      const { productId, qty } = code;
      const price = csvData.find((i) => i.code === productId)
        ?.newPrice as number;
      const dbPrice = Number(dbProducts.find((i) => i.code === productId)
        ?.salesPrice) as number;
      return acc + (price || dbPrice) * qty;
    }, 0);
    
    if (!(product.newPrice === Number(sumProductsPrices.toFixed(2)))) {
      const error = lineErrors.find((i) => i.code === product.code);
      const message = `O novo preço do pacote ${
        product.code
      } não é igual à soma do(s) preço(s) do(s) produto(s) ${productsOnPack
        .map((item) => item.productId)
        .join(", ")}, respeitando sua(s) respectiva(s) quantidade(s) no pacote`;
      if (error) {
        if (!error.message?.includes(message)) {
          error.message?.push(message);
        }
      } else {
        invalidCodes.add({
          code: product.code,
          message: [message],
        });
      }
    }
  });

  return [...lineErrors, ...Array.from(invalidCodes)];
};

export default validatePacksPrices;
