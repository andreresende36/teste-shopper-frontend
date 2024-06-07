import { useContext } from "react";
import AppContext from "../context/AppContext";
import BACKEND_URL from "../endpoints";

function UpdateButton() {
  const {
    updateIsEnabled,
    csvData,
    setUpdateSuccess,
    setTableIsEnabled,
    setCsvData,
    setValidateIsEnabled,
    setUpdateIsEnabled,
    tableError
  } = useContext(AppContext);
  const handleButton = async () => {
    const response = await fetch(`${BACKEND_URL}products`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(csvData),
    });
    const data = await response.json();
    if (data.message === "OK") {
      setCsvData([]);
      setUpdateSuccess(true);
      setTableIsEnabled(false);
      setValidateIsEnabled(false);
      setUpdateIsEnabled(false)
    }
  };
  return (
    <>
      <button
        disabled={!updateIsEnabled || tableError !== ''}
        onClick={handleButton}
        type="button"
        className={`font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
          updateIsEnabled
            ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "text-gray-500 bg-gray-300 cursor-not-allowed"
        }`}
      >
        ATUALIZAR
      </button>
    </>
  );
}

export default UpdateButton;
