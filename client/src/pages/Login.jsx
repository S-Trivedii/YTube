import axios from "../utils/axiosInstance"; // axios instance
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
// import { parseJoiErrorMessage } from "../utils/joiErrorParser";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { input, errors, handleChange, validateFields } = useForm({
    identifier: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  // const [joiError, setJoiError] = useState({});

  const handleLogin = async () => {
    if (!validateFields()) return;

    // setJoiError({});

    setLoading(true);
    try {
      const response = await axios.post("/user/login", input); // axiosInstance

      if (response.data.success) {
        dispatch(loginSuccess({ user: response.data.user }));
        navigate("/");
      }
    } catch (error) {
      console.log("Login failed ", error.response?.data || error.message);

      // const msg = error.response?.data?.message?.toLowerCase();
      // const joiErrors = parseJoiErrorMessage(msg);
      // setJoiError(joiErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f9f9f9]">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <input
            type="text"
            value={input.identifier}
            name="identifier"
            onChange={handleChange}
            placeholder="Email or Username"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={input.password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>
        <button
          onClick={handleLogin}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
