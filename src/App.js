import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/signin" replace />}
        />

        {/* Public pages */}
        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected page */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;