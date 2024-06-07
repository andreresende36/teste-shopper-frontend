import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import {
  validateCodes,
  validateExistsOnDb,
  validateFields,
  validateFinancePrices,
  validateMarketingPrices,
  validatePacksPrices,
  validatePacksProducts,
  validateTypePrices,
} from "../utils";

function ValidateButton() {
  const {
    csvData,
    csvFields,
    dbProducts,
    setTableError,
    dbPacks,
    setTableIsEnabled,
    setLineErrors,
    setUpdateIsEnabled,
    validateIsEnabled,
    tableError,
    setValidateIsEnabled
  } = useContext(AppContext);
  
  useEffect(() => {
    if(tableError !== '') setValidateIsEnabled(false)
  }, [tableError, setValidateIsEnabled])

  const handleValidation = async () => {
    const missingFields = validateFields(csvFields);
    if (missingFields.length > 0) {
      setTableError(`Campo(s) necessário(s) ausente(s): ${missingFields.join(", ")}`);
      return;
    }

    let errors = validateCodes(csvData);
    errors = validateExistsOnDb(csvData, dbProducts, errors);
    errors = validateTypePrices(csvData, errors);
    errors = validateFinancePrices(csvData, dbProducts, errors);
    errors = validateMarketingPrices(csvData, dbProducts, errors);
    errors = validatePacksProducts(csvData, dbPacks, errors);
    errors = validatePacksPrices(csvData, dbPacks, dbProducts, errors);

    setLineErrors(errors);
    if (errors.length === 0) setUpdateIsEnabled(true);
    if (csvData.length !== 0) setTableIsEnabled(true);
  };

  return (
    <div>
      <button
        disabled={!validateIsEnabled}
        onClick={handleValidation}
        type="button"
        className={`font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
          validateIsEnabled
            ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "text-gray-500 bg-gray-300 cursor-not-allowed"
        }`}
      >
        VALIDAR
      </button>
    </div>
  );
}

export default ValidateButton;
