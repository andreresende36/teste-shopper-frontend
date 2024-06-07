import { useContext } from "react";
import AppContext from "../context/AppContext";

function UpdateSuccess() {
  const { updateSuccess } = useContext(AppContext);
  return (
    <div>
      {updateSuccess ? (
        <div className="text-xl font-semibold mb-3 bg-green-600 bg-opacity-85 text-neutral-100 rounded py-1 px-4">
          Preços atualizados com sucesso!
        </div>
      ) : null}
    </div>
  );
}

export default UpdateSuccess;
