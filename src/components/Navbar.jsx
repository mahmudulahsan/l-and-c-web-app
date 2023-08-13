import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="container mx-auto navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400">
                About
              </Link>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          style={{ backgroundColor: "#f8680c", color: "white" }}
          className="btn btn-ghost normal-case text-xl rounded-none"
        >
          L&C
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="hover:text-orange-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-400">
              About
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!currentUser ? (
          <a
            onClick={() => navigate("/login")}
            className="btn border-0 text-error"
          >
            Login/Register
          </a>
        ) : (
          <>
            <a
              className="btn border-0 mr-3 text-white"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </a>
            <a
              className="btn border-0 text-white"
              onClick={() => {
                navigate("/");
                signOut(auth);
              }}
            >
              Logout
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
