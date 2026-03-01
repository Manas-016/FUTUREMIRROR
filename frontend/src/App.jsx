import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Simulation from "./pages/Simulation";
import Scanner from "./pages/Scanner";
import ClickScan from "./pages/ClickScan";
import AnimatedPage from "./pages/AnimatedPage";
import Result from "./pages/Result";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/Auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route
          path="/simulate"
          element={
            <ProtectedRoute>
              <Simulation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Scanner"
          element={
            <ProtectedRoute>
              <Scanner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ClickScan"
          element={
            <ProtectedRoute>
              <ClickScan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/AnimatedPage"
          element={
            <ProtectedRoute>
              <AnimatedPage />
            </ProtectedRoute>
          }
        />

        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;