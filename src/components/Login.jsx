import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("farhan@gmail.com");
  const [password, setPassword] = useState("Farhan@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="-mt-4">
            <fieldset className="fieldset my-4">
              <legend className="fieldset-legend">Enter email?</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                placeholder="Type here"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset my-4">
              <legend className="fieldset-legend">Enter password?</legend>
              <input
                type="text"
                className="input"
                value={password}
                placeholder="Type here"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
