import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import Loan from "./pages/Loan.jsx";
import WantLoan from "./pages/WantLoan.jsx";
import GiveLoan from "./pages/GiveLoan.jsx";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import Protected from "./pages/Protected.jsx";

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            ></Route>
            <Route
              path="/loan"
              element={
                <Protected>
                  <Loan />
                </Protected>
              }
            ></Route>
            <Route
              path="/loan/want-loan"
              element={
                <Protected>
                  <WantLoan />
                </Protected>
              }
            ></Route>
            <Route
              path="/loan/give-loan"
              element={
                <Protected>
                  <GiveLoan />
                </Protected>
              }
            ></Route>

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
