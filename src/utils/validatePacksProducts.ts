import { CsvProduct } from "../interfaces/csvProduct";
import { LineErrors } from "../interfaces/lineErrors";
import { DbPack } from "../interfaces/dbPack";

const validatePacksProducts = (
  csvData: CsvProduct[],
  dbPacks: DbPack[],
  lineErrors: LineErrors[]
) => {
  const csvDataMap = new Map(csvData.map((item) => [item.code, item]));
  const invalidCodes = new Set<LineErrors>();

  csvData.forEach((product) => {
    const packs = dbPacks.filter(
      (pack) => pack.packId === product.code
    ) as DbPack[];
    if (packs.length === 0) return;

    const missingProducts = [
      packs[0].packId,
      ...packs.map((pack) => pack.productId),
    ].filter((id) => !csvDataMap.has(id));   
    
    if ((missingProducts.length === packs.length)) {
      const message = `O pacote ${
        product.code
      } exige que pelo menos um dos produtos ${missingProducts.join(
        ", "
      )} esteja na planilha`;
      const error = lineErrors.find((i) => i.code === product.code);
  
      if (error && !error.message?.includes(message)) {
        error.message?.push(message);
      } else {
        invalidCodes.add({ code: product.code, message: [message] });
      }
    };
  });

  return [...lineErrors, ...Array.from(invalidCodes)];
};

export default validatePacksProducts;

