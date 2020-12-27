import useFormSubmission from "./useFormSubmission";

const App = () => {
  const [{ status, data, error }, formSubmissionCallback] = useFormSubmission();

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.elements["username"].value;
    formSubmissionCallback({ username });
  };

  console.log("Status: ", status);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div>
        {status === "pending" ? <span>Registering username</span> : null}
      </div>
      <div>
        {status === "error" ? <span>Something went wrong: {error.message}</span> : null}
      </div>
      <div>
        {status === "resolved" ? <span>Registration successfully. ID: {data.id}</span> : null}
      </div>
    </div>
  );
};

export default App;
