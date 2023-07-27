import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./components/home";
import { SelectedTravelsList } from "./components/selected_travels_list";
import { Login } from "./components/login";
import { userStore } from "./store/store";
import { useEffect } from "react";

const PrivateRoute = ({ path, component }) => {
  const isLoggedIn = sessionStorage.getItem("phno") || false;
  const isTravelsList =
    sessionStorage.getItem("selectedTravelDetails") || false;
  if (isLoggedIn) {
    return component;
  } else {
    if (isLoggedIn && !isTravelsList) {
      console.log("istravel");
      return <Navigate to="/" replace={true} />;
    }
    return <Navigate to="/login" replace={true} />;
  }
};

function App() {
  console.log("app");
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={<PrivateRoute path="/" component={<Home />} />}
      />
      <Route
        path="/travels-list"
        element={
          <PrivateRoute
            path="/travels-list"
            component={<SelectedTravelsList />}
          />
        }
      />
    </Routes>
  );
}

export default App;
