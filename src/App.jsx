import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// pages imports
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/Notfound";
import { useContext } from "react";
import { SearchContext } from "./context/SearchContext";

const ProtectedRoute = () => {
  const { dates } = useContext(SearchContext);
  return dates.length ? <Outlet /> : <Navigate to="/" />;
};

const App = () => {
  return (
    // configures app to be a spa
    <Router>
      {/* conditional routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/hotels/:id" element={<Hotel />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
