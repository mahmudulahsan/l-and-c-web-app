import { collection, getDocs, addDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const GiveLoan = () => {
  const { currentUser } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestId, setRequestId] = useState("");
  const [requesterUid, setRequesterUid] = useState("");

  const [interestRate, setInterestRate] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const obj = {
    requestId: requestId,
    requesterUid: requesterUid,
    uid: currentUser.uid,
    interestRate,
    date,
    note,
    status: "pending",
  };

  const tempObj = obj;

  useEffect(() => {
    const fetchData = async () => {
      const loansCollection = collection(db, "requests");
      const loansSnapshot = await getDocs(loansCollection);
      const loanData = loansSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          uid: doc.data().uid,
          name: doc.data().name,
          email: doc.data().email,
          phone: doc.data().phone,
          studentId: doc.data().studentId,
          loanAmount: doc.data().loanAmount,
          loanDetails: doc.data().details,
        };
      });
      //   setLoading(false);
      setRequests(loanData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tempObj);
    const submitWantLoanForm = async () => {
      await addDoc(collection(db, `offers`), tempObj);
      toast.success("Success!");
    };
    submitWantLoanForm();
  };

  //   console.log(requests);
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
              {requests.map((request) => {
                return (
                  <>
                    <div className="card p-4 m-4  w-96 glass">
                      <h2 className="px-6 card-title">{request.name}</h2>
                      <div className="flex justify-around items-center px-6">
                        <div className="flex flex-col">
                          <div>
                            {request.email}
                            <i className="px-2 fa-solid fa-building-columns"></i>
                          </div>
                          <div>
                            {request.phone}
                            <i className="px-2 fa-solid fa-anchor"></i>
                          </div>
                          <div>
                            {request.studentId}
                            <i className="px-2 fa-solid fa-paperclip"></i>
                          </div>
                          <div>
                            {request.loanAmount}
                            <i className="px-2 fa-solid fa-paperclip"></i>
                          </div>
                          <div>
                            {request.loanDetails}
                            <i className="px-2 fa-solid fa-paperclip"></i>
                          </div>
                        </div>

                        <div>
                          <button
                            className="btn"
                            onClick={() => {
                              document.getElementById("my_modal_5").showModal();
                              setRequestId(request.id);
                              setRequesterUid(request.uid);
                            }}
                          >
                            Offer
                          </button>
                          <dialog
                            id="my_modal_5"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <form method="dialog" className="modal-box">
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
                                <br />
                                <br />
                                <label htmlFor="date">Return Date</label>
                                <br />
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
                                <button
                                  className="btn"
                                  onClick={() =>
                                    document
                                      .getElementById("my_modal_5")
                                      .close()
                                  }
                                >
                                  Close
                                </button>
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
