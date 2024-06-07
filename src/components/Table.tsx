import TableRow from "./TableRow";
import { RowData } from "../interfaces/rowData";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const Table: React.FC<{ rows: RowData[] }> = ({ rows }) => {
  const { tableIsEnabled, lineErrors } = useContext(AppContext);
  const table = (
    <div className="flex flex-col mx-36">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium border-[#07A776] bg-[#1E2044]">
                <tr>
                  <th scope="col" className="px-6 py-4 text-white text-center text-lg">
                    Código
                  </th>
                  <th scope="col" className="px-6 py-4 text-white text-center text-lg">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-4 text-white text-center text-lg">
                    Preço Atual
                  </th>
                  <th scope="col" className="px-6 py-4 text-white text-center text-lg">
                    Novo Preço
                  </th>
                  {lineErrors.length > 0 ? (
                    <th
                      scope="col"
                      className="px-6 py-4 text-white text-center text-lg"
                    >
                      Erros
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <TableRow key={index} data={row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{tableIsEnabled ? table : null}</>;
};

export default Table;
