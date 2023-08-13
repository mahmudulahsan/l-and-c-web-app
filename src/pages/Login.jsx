import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

import Navbar from "../components/Navbar.jsx";

// import login_img from "./login_img.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-16 mb-52 container mx-auto flex justify-center">
        <div
          style={{ borderRadius: "20px", width: "600px", height: "400px", backgroundColor:"#f8680c" }}
          className="flex flex-col md:flex-row justify-between items-center bg-primary text-primary-content p-10 m-4 md:m-1 "
        >
          <div className="text-3xl" style={{ lineHeight: ".80" }}>
            <div>
              Welcome to <br /> 
              <div  className="p-3 font-bold text-center">
                L&C
              </div>
              <div className="mt-2 flex justify-center">
                <hr style={{ width: "100px" }} />
              </div>
              <div className="hidden md:block pr-4">
                {/* <img style={{ width: "200px" }} src={login_img} alt="" /> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8">
            <div className="text-2xl pb-4 text-center font-bold">Login</div>
            <form onSubmit={handleSubmit}>
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                type="email"
                placeholder="Email"
                required
              />
              <br />
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                type="password"
                placeholder="password"
                required
              />
              <br />
              <button className="btn btn-sm">Sign in</button>

              {err && (
                <div className="">
                  <div className="my-1 bg-error text-error-content p-1 rounded">
                    <span>Something went wrong.</span>
                  </div>
                </div>
              )}
            </form>
            <p className="text-sm mt-3">
              Dont have an account? <Link className="link" to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
