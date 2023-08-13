import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Loan = () => {
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="">
            <h1 className="text-5xl font-bold">
              Welcome to Peer to Peer <br /> Loan System
            </h1>
            <Link to="give-loan"
              style={{ borderRadius: "25px" }}
              className="mt-8 mx-5 btn btn-outline  outline-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              Give Loan
            </Link>
            <Link to="want-loan"
              style={{ borderRadius: "25px" }}
              className="mt-8 mx-5 btn btn-outline  outline-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              Want Loan
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Loan;
