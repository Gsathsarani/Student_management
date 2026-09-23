import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignIn() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    // Get registered students
    const users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    // Find matching user
    const user = users.find(
      (student) =>
        student.username === username &&
        student.password === password
    );

    // User doesn't exist or password incorrect
    if (!user) {

      setError(
        "Invalid username or password. Please register first if you do not have an account."
      );

      return;
    }

    // Don't allow dropped-out students
    if (user.status === "Dropped Out") {

      setError(
        "This student account is currently inactive."
      );

      return;
    }

    // Save logged-in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    // Go to dashboard
    navigate("/dashboard");
  };

  return (

    <div className="signin-page">

      <div className="signin-card">

        <div className="signin-header">

          <div className="signin-icon">
            🎓
          </div>

          <h1>
            Student Login
          </h1>

          <p>
            Sign in to access your student account.
          </p>

        </div>


        {error && (

          <div className="error-message">
            {error}
          </div>

        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter your username"
            />

          </div>


          <div className="form-group">

            <label>
              Password
            </label>

            <div className="password-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="password-input"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3.5L20.5 21l-1.4 1.4L15.8 20A12.9 12.9 0 0 1 12 21c-4.7 0-8.7-2.7-11-6.6a15.8 15.8 0 0 1 3.1-4.1L3 3.5zm8.4 9.4l2.9 2.9a3 3 0 0 1-2.9-2.9zm-1.3-1.3L6 7.9A10.5 10.5 0 0 0 1 12c2.3 3.9 6.3 6.6 11 6.6 2.1 0 4-.5 5.7-1.5l-3.5-3.5A3 3 0 0 1 10.1 11.6zm8.6-4.7A13 13 0 0 1 23 12c-2.3 3.9-6.3 6.6-11 6.6a10.8 10.8 0 0 1-4.9-1.2l2.4-2.4A3 3 0 0 0 15 12c0-.7-.2-1.4-.5-2l3.5-3.5zm-5.6-3.3A7.7 7.7 0 0 1 12 6c4.7 0 8.7 2.7 11 6.6-.7 1.1-1.6 2.2-2.6 3.1l-1.2-1.2A10.1 10.1 0 0 0 20.4 12c-1.7-2.6-4.1-4.2-7.1-4.9l-2.6-2.6z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 5C6.5 5 1.9 8.8 0 12c1.9 3.2 6.5 7 12 7s10.1-3.8 12-7c-1.9-3.2-6.5-7-12-7zm0 11.5A4.5 4.5 0 1 1 12 7a4.5 4.5 0 0 1 0 9.5zm0-2A2.5 2.5 0 1 0 12 9a2.5 2.5 0 0 0 0 5.5z" fill="currentColor"/>
                  </svg>
                )}
              </button>
            </div>

          </div>


          <button
            type="submit"
            className="login-button"
          >
            Sign In
          </button>

        </form>


        <div className="register-prompt">

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Register as a Student
          </Link>

        </div>

      </div>

    </div>
  );
}

export default SignIn;