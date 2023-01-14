import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("Password is updated");
        setPassword("");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  const passwordUpdateForm = () => (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label> New password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter new password"
            disabled={loading}
            value={password}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!password || password.length < 6 || loading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <div className="col text-center">
      {loading ? (
        <h3 className="text-danger">Loading</h3>
      ) : (
        <h3>Password updated</h3>
      )}
      {passwordUpdateForm()}
    </div>
  );
};

export default Password;
