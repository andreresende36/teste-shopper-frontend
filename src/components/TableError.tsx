import { useContext } from "react";
import AppContext from "../context/AppContext";

const TableError = () => {
  const { tableError } = useContext(AppContext);
  return (
    <>
      {(tableError) && (
        <div className="text-xl font-semibold mb-3 bg-red-600 bg-opacity-80 text-neutral-100 rounded py-1 px-8">
          <p>{tableError}</p>
        
        </div>
      )}
    </>
  );
};

export default TableError;
