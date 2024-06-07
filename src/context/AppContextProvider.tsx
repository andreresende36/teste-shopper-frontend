import React, { useState, useEffect } from 'react';
import { CsvProduct } from '../interfaces/csvProduct';
import { AppContextType } from '../interfaces/AppContextType';
import AppContext from './AppContext';
import { DbProduct } from '../interfaces/dbProduct';
import { DbPack } from '../interfaces/dbPack';
import { LineErrors } from '../interfaces/lineErrors';
import BACKEND_URL from '../endpoints';
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [csvData, setCsvData] = useState<CsvProduct[]>([]);
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const [dbPacks, setDbPacks] = useState<DbPack[]>([]);
  const [csvFields, setCsvFields] = useState<string[]>([]);
  const [tableError, setTableError] = useState<string>("");
  const [tableIsEnabled, setTableIsEnabled] = useState(false);
  const [validateIsEnabled, setValidateIsEnabled] = useState(false);
  const [updateIsEnabled, setUpdateIsEnabled] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [lineErrors, setLineErrors] = useState<LineErrors[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseProducts = await fetch(`${BACKEND_URL}products`);
        const responsePacks = await fetch(`${BACKEND_URL}packs`);
        if (!responseProducts) {
          throw new Error("Não foi possível carregar os produtos.");
        }
        if (!responsePacks) {
          throw new Error("Não foi possível carregar os pacotes.");
        }
        const dataProducts: DbProduct[] = await responseProducts.json();
        const dataPacks: DbPack[] = await responsePacks.json();
        setDbProducts(dataProducts);
        setDbPacks(dataPacks);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [updateSuccess]);

  const value: AppContextType = {
    csvData,
    dbProducts,
    csvFields,
    tableError,
    dbPacks,
    tableIsEnabled,
    lineErrors,
    updateIsEnabled,
    updateSuccess,
    validateIsEnabled,
    setCsvData,
    setDbProducts,
    setCsvFields,
    setTableError,
    setDbPacks,
    setTableIsEnabled,
    setLineErrors,
    setUpdateIsEnabled,
    setUpdateSuccess,
    setValidateIsEnabled
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
};