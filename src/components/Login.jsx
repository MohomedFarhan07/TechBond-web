import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("farwina@gmail.com");
  const [password, setPassword] = useState("Farwina@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );
      const user = await data.data;
      dispatch(addUser(user));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong1!!");
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
          <p className="text-red-500 font-bold">{error}</p>
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
