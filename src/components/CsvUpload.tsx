import React, { useContext, useRef,useEffect } from "react";
import { CsvProduct } from "../interfaces/csvProduct";
import AppContext from "../context/AppContext";

const CsvUpload: React.FC = () => {
  const {
    setCsvData,
    setCsvFields,
    setTableError,
    setValidateIsEnabled,
    setTableIsEnabled,
    setUpdateIsEnabled,
    setUpdateSuccess,
    updateSuccess
  } = useContext(AppContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableIsEnabled(false);
    setUpdateIsEnabled(false);
    setUpdateSuccess(false);
    setTableError('');
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "csv") {
        setTableError("Erro: O arquivo carregado não é um arquivo .csv");
        return;
      } else {
        setTableError("");
        setValidateIsEnabled(true);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        parseCsv(contents);
      };
      reader.readAsText(file);
    }
  };

  const parseCsv = (csv: string) => {
    const lines = csv.split("\n");
    setCsvFields(lines[0].replace("\r", "").split(","));
    const products: CsvProduct[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        let [code, newPrice] = line.split(",");
        products.push({
          code: code as any,
          newPrice: newPrice as any,
        });
      }
    }
    products.forEach(({ code, newPrice }, i) => {
      if (!isNaN(Number(code))) {
        products[i].code = Number(code);
      }
      if (!isNaN(Number(newPrice))) {
        products[i].newPrice = Number(newPrice);
      }
    });
    setCsvData(products);
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      clearFileInput();
    }
  }, [updateSuccess]);

  return (
    <div className="relative mt-3 flex justify-center items-center">
        <input
          id="formFile"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="file-input file-input-bordered file-input-success w-[40rem]"
        />
    </div>
  );
}

export default CsvUpload;
