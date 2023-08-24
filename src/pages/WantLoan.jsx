import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";

import toast, { Toaster } from "react-hot-toast";

import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import Footer from "../components/Footer.jsx";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase.js";

const WantLoan = () => {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [details, setDetails] = useState("");

  const obj = {
    uid: currentUser.uid,
    name,
    email,
    phone,
    studentId,
    loanAmount,
    details,
  };

  const tempObj = obj;

  useEffect(() => {
    console.log(currentUser.uid);
    if (!currentUser.uid) return;
    const companyRef = doc(db, "users", currentUser.uid);

    const fetchData = async () => {
      const userInfoDoc = await getDoc(companyRef);
      //   console.log("testing--------------",userInfoDoc.data())

      setName(userInfoDoc.data().displayName);
      setEmail(userInfoDoc.data().email);
      setPhone(userInfoDoc.data().phoneNo);
      setStudentId(userInfoDoc.data().studentId);
    };

    fetchData();
  }, [currentUser.uid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tempObj);
    const submitWantLoanForm = async () => {
      await addDoc(collection(db, "requests"), tempObj);
      toast.success("Success!");
    };
    submitWantLoanForm();
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="mt-4 text-center md:text-4xl text-2xl my-4">
          Fill-up the form
        </div>
        <div className="container flex justify-center">
          <form onSubmit={handleSubmit} className="w-1/2 mb-20">
            <label className="flex flex-col">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="input w-full input-bordered"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="input w-full input-bordered"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
                className="input w-full input-bordered"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Your Student ID"
                className="input w-full input-bordered"
                required
              />
            </label>
            <br />
            <label className="flex flex-col">
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter Loan Amount"
                className="input w-full input-bordered"
                required
              />
            </label>

            <br />
            <label className="flex flex-col">
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="textarea textarea-bordered h-44"
                placeholder="Enter Details"
              ></textarea>
            </label>

            <br />

            <button
              type="submit"
              className="btn text-white border-orange-500 hover:bg-orange-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
      <Toaster />
    </>
  );
};

export default WantLoan;
