import { useContext } from "react";
import { StateContext } from "../../context/AppContext";
import { ACTIONS } from "../../helpers/utils";

const ErrorModal = () => {
  const { state, dispatch } = useContext(StateContext);
  function onClose() {
    dispatch({type: ACTIONS.SET_ERROR_TEXT, payload: ''})
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold text-red-600">Error</h2>
        <p className="mt-4 text-gray-600">{state.errorText}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorModal;