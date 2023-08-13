import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { auth, db } from "../firebase.js";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const studentId = e.target[1].value;
    const phoneNo = e.target[2].value;
    const email = e.target[3].value;
    const password = e.target[4].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        studentId,
        phoneNo,
        email,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-16 mb-52 container mx-auto flex justify-center">
        <div
          style={{ borderRadius: "20px", width: "600px", backgroundColor:"#f8680c" }}
          className="flex flex-col md:flex-row justify-between items-center text-primary-content p-10"
        >
          <div className="text-3xl" style={{ lineHeight: ".80" }}>
            <div>
              Welcome to <br /> 
              <div style={{color: "#1d232a"}} className="p-3 font-bold text-center">
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
            <div className="text-2xl pb-4 text-center font-bold">Register</div>
            <form onSubmit={handleSubmit}>
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                // style={{ color: "#002b3d" }}
                type="text"
                placeholder="Name"
                required
              />
              <br />
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                // style={{ color: "#002b3d" }}
                type="number"
                placeholder="Student ID"
                required
              />
              <br />
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                // style={{ color: "#002b3d" }}
                type="number"
                placeholder="Phone No"
                required
              />
              <br />
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                // style={{ color: "#002b3d" }}
                type="email"
                placeholder="Email"
                required
              />
              <br />
              <input
                className="mb-2 input input-bordered w-full max-w-xs"
                // style={{ color: "#002b3d" }}
                type="password"
                placeholder="password"
                required
              />
              <br />
              <button className="btn btn-sm">Register</button>{" "}
            </form>
            <p className="text-sm mt-3">
              Already have an account?{" "}
              <Link className="link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
