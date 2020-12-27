import { useReducer, useCallback } from "react";

const useFormSubmissionReducer = (state, action) => {
  switch (action.type) {
    case "start":
      return { status: "pending" };
    case "resolved":
      return { status: "resolved", data: action.data };
    case "rejected":
      return { status: "rejected", error: action.error };
    default:
      throw new Error(`Unsupported type: ${action.type}`);
  }
};

const handleResponse = async (response) => {
  const data = await response.json();

  if (response.status >= 200 && response.status <= 299) {
    return Promise.resolve(data);
  } else {
    return Promise.reject(data);
  }
};

const useFormSubmission = () => {
  const [state, dispatch] = useReducer(useFormSubmissionReducer, {
    status: "idle",
    data: null,
    error: null,
  });

  const callback = useCallback((request) => {
    const payload = JSON.stringify(request);

    console.log("Dispatching: ", request);
    dispatch({ type: "start" });

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
      .then(handleResponse)
      .then(
        (data) => {
          console.log("Data: ", data);
          dispatch({ type: "resolved", data });
        },
        (error) => {
          console.log("Error: ", error);
          dispatch({ type: "rejected", error });
        }
      )
      .catch((error) => {
        console.log("Exception: ", error);
        dispatch({ type: "rejected", error: { message: error.message } });
      });
  }, []);

  return [state, callback];
};

export default useFormSubmission;
