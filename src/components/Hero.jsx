import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="">
          <h1 className="text-5xl font-bold">
            Welcome to Peer to Peer <br /> Loan System & <br />
            Crowdsourcing
          </h1>
          <Link to="/loan">
            {" "}
            <button
              style={{ borderRadius: "25px" }}
              className="mt-8 mx-5 btn btn-outline  outline-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
            >
              Loans
            </button>
          </Link>
          <button
            style={{ borderRadius: "25px" }}
            className="mt-8 mx-5 btn btn-outline  outline-orange-500 hover:bg-orange-500 hover:border-orange-500 hover:text-white"
          >
            Croudsourcing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
