import React, { useRef, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface LoginModalProps {
  // function for modal window closing
  onClose: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const modalRef = useRef<HTMLDivElement>(null); // link to modal window content
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // close modal
    }
  };

  // form sending handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login/", {
        email: email,
        password: password,
      });

      console.log("tokens:", response.data);

      login(response.data);

      onClose();

      //callback
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.response && err.response.status === 401) {
        setError("Wrong email or password.");
      } else {
        setError("Error. Try later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
      >
        <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg relative"
        >
          <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="mb-4">
              <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 text-gray-700 w-full border rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 text-gray-700 w-full border rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
              />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* sign up link */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
  );
};

export default LoginModal;
