import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const GiveLoan = () => {
  const { currentUser } = useContext(AuthContext);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clickedUid, setClickedUid] = useState("");

  //   console.log(clickedUid)

  const [interestRate, setInterestRate] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const obj = {
    uid: clickedUid,
    interestRate,
    date,
    note,
  };

  const tempObj = obj;

  //   console.log("test--------------------", tempObj);

  useEffect(() => {
    const fetchData = async () => {
      const loansCollection = collection(db, "want_loan");
      const loansSnapshot = await getDocs(loansCollection);
      const loanData = loansSnapshot.docs.map((doc) => {
        const obj = doc.data().data;
        const parsedObj = JSON.parse(obj);
        return {
          uid: parsedObj.uid,
          name: parsedObj.name,
          email: parsedObj.email,
          phone: parsedObj.phone,
          studentId: parsedObj.studentId,
          loanAmount: parsedObj.loanAmount,
          loanDetails: parsedObj.details,
        };
      });
      //   setLoading(false);
      setResumes(loanData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tempObj);
    const submitWantLoanForm = async () => {
      await setDoc(doc(db, `users`, clickedUid, `requests`, currentUser.uid), {
        data: JSON.stringify(tempObj),
      });
      toast.success("Success!");
      // console.log("success");
    };
    submitWantLoanForm();
  };

  //   console.log(resumes);
  return (
    <>
      <Navbar />

      <div className="container mx-auto">
        <div className="text-3xl my-12">
          Loans that students are looking for
          <hr style={{ width: "50px", opacity: ".5", border: "1px solid" }} />
        </div>
        <div className="flex justify-center flex-wrap">
          {loading ? (
            <>
              <div className="card m-4 mb-36  w-96 glass">
                <div className="card-body">
                  <h2 className="text-center font-bold text-xl">
                    <div className="h-2 bg-slate-300 rounded mb-2"></div>
                    <div className="h-2 bg-slate-300 rounded mb-2"></div>
                    <div className="h-2 bg-slate-300 rounded mb-2"></div>
                    <div className="h-2 bg-slate-300 rounded"></div>
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <div className="mb-52">
              {resumes.map((resume) => {
                return (
                  <>
                    <div className="card p-4 m-4  w-96 glass">
                      <h2 className="px-6 card-title">{resume.name}</h2>
                      <div className="flex justify-around items-center px-6">
                        <div className="flex flex-col">
                          <div>
                            {resume.email}
                            <i className="px-2 fa-solid fa-building-columns"></i>
                          </div>
                          <div>
                            {resume.phone}
                            <i className="px-2 fa-solid fa-anchor"></i>
                          </div>
                          <div>
                            {resume.studentId}
                            <i className="px-2 fa-solid fa-paperclip"></i>
                          </div>
                          <div>
                            {resume.loanAmount}
                            <i className="px-2 fa-solid fa-paperclip"></i>
                          </div>
                          <div>
                            {resume.loanDetails}
                            <i className="px-2 fa-solid fa-paperclip"></i>
                          </div>
                        </div>

                        <div>
                          <button
                            className="btn"
                            onClick={() => {
                              window.my_modal_5.showModal();
                              setClickedUid(resume.uid);
                            }}
                          >
                            Request
                          </button>
                          <dialog
                            id="my_modal_5"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <form
                            //   onSubmit={handleSubmit}
                              method="dialog"
                              className="modal-box"
                            >
                              <h3 className="font-bold text-lg">
                                Thanks for showing interest!
                              </h3>
                              <p className="py-4">
                                <input
                                  type="text"
                                  value={interestRate}
                                  onChange={(e) =>
                                    setInterestRate(e.target.value)
                                  }
                                  placeholder="Interest Rate"
                                  className="input input-bordered w-full max-w-xs"
                                />{" "}
                                %
                                <input
                                  type="date"
                                  value={date}
                                  onChange={(e) => setDate(e.target.value)}
                                  placeholder="Type here"
                                  className="mt-3 input input-bordered w-full max-w-xs"
                                />
                                <input
                                  type="text"
                                  value={note}
                                  onChange={(e) => setNote(e.target.value)}
                                  placeholder="Additional Note"
                                  className="h-36 mt-3 input input-bordered w-full max-w-xs"
                                />{" "}
                              </p>
                              <button
                                // type="submit"
                                onClick={handleSubmit}
                                className="btn text-white border-orange-500 hover:bg-orange-500"
                              >
                                Submit
                              </button>
                              <div className="modal-action">
                                <button className="btn">Close</button>
                              </div>
                            </form>
                          </dialog>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default GiveLoan;
