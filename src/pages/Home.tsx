import React, { useContext } from "react";
import ValidateButton from "../components/ValidateButton";
import CsvUpload from "../components/CsvUpload";
import Table from "../components/Table";
import AppContext from "../context/AppContext";
import { CsvProduct } from "../interfaces/csvProduct";
import { DbProduct } from "../interfaces/dbProduct";
import { RowData } from "../interfaces/rowData";
import UpdateButton from "../components/UpdateButton";
import { formatPrice } from "../utils";
import UpdateSuccess from "../components/UpdateSuccess";
import Header from "../components/Header";
import TableError from "../components/TableError";

function Home() {
  const {
    csvData,
    dbProducts,
  }: { csvData: CsvProduct[]; dbProducts: DbProduct[] } =
    useContext(AppContext);
  const rows = csvData.map((product) => {
    const dbProduct = dbProducts.find(
      (i) => i.code === product.code
    ) as DbProduct;
    const row: RowData = {
      code: product.code,
      name: dbProduct?.name ? dbProduct.name : "CÓDIGO INVÁLIDO",
      newPrice: formatPrice(String(product.newPrice)),
      salesPrice: dbProduct?.salesPrice
        ? formatPrice(dbProduct.salesPrice)
        : "-",
    };
    return row;
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="m-auto">
        <div className="flex flex-col justify-center items-center bg-slate-500 p-12 bg-opacity-90 rounded-lg">
          <Header />
          <Table rows={rows} />
          <CsvUpload />
          <div className="my-3">
            <TableError />
          </div>
          <UpdateSuccess />
          <div className="flex justify-center items-center">
            <ValidateButton />
            <UpdateButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
