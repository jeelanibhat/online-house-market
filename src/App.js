import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./component/Navbar";
import Explore from "./pages/Explore";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        transition={Slide}
      />
    </>
  );
}

export default App;
