import { CsvProduct } from "./csvProduct";
import { DbProduct } from "./dbProduct";
import { DbPack } from "./dbPack";
import { LineErrors } from "./lineErrors";

export interface AppContextType {
  csvData: CsvProduct[];
  dbProducts: DbProduct[];
  csvFields: string[];
  tableError: string
  dbPacks: DbPack[];
  tableIsEnabled: boolean;
  lineErrors: LineErrors[];
  updateIsEnabled: boolean;
  updateSuccess: boolean;
  validateIsEnabled: boolean;
  setCsvData: React.Dispatch<React.SetStateAction<CsvProduct[]>>;
  setDbProducts: React.Dispatch<React.SetStateAction<DbProduct[]>>;
  setCsvFields: React.Dispatch<React.SetStateAction<string[]>>;
  setTableError: React.Dispatch<React.SetStateAction<string>>;
  setDbPacks: React.Dispatch<React.SetStateAction<DbPack[]>>;
  setTableIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setValidateIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setLineErrors: React.Dispatch<React.SetStateAction<LineErrors[]>>;
}