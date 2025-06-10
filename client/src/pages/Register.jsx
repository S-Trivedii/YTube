import axios from "../utils/axiosInstance"; // axios instance
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { parseJoiErrorMessage } from "../utils/joiErrorParser";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { input, errors, handleChange, validateFields } = useForm({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [joiError, setJoiError] = useState({});

  // User register
  const handleRegister = async () => {
    if (!validateFields()) return;

    setJoiError({});
    setLoading(true);
    try {
      const registerResponse = await axios.post("/user/register", input); // axiosInstance
      // input: {username: '', email: '', password: ''}

      if (registerResponse.data.success) {
        // Auto-login

        const identifier = input.email || input.username;

        const loginResponse = await axios.post("/user/login", {
          identifier,
          password: input.password,
        });

        if (loginResponse.data.success) {
          dispatch(loginSuccess({ user: loginResponse.data.user }));
          navigate("/");
        }
      }
      // console.log("Register response ", response.data);
    } catch (error) {
      console.error(
        "Registration failed: ",
        error.response?.data || error.message
      );

      const msg = error.response?.data?.message?.toLowerCase();
      const joiErrors = parseJoiErrorMessage(msg);
      setJoiError(joiErrors);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f9f9f9]">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            value={input.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
          {joiError.username && (
            <p className="text-red-500 text-xs mt-1">{joiError.username}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            value={input.email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          {joiError.email && (
            <p className="text-red-500 text-xs mt-1">{joiError.email}</p>
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
          {joiError.password && (
            <p className="text-red-500 text-xs mt-1">{joiError.password}</p>
          )}
        </div>

        {joiError.general && (
          <p className="text-red-500 text-xs mt-1">{joiError.general}</p>
        )}

        <button
          onClick={handleRegister}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
