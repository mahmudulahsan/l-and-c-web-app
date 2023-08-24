import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      if (!currentUser.uid) return;
      const userRef = doc(collection(db, "users"), currentUser.uid);

      var docSnap = await getDoc(userRef);

      setEmail(docSnap.data().email);
      setName(docSnap.data().displayName);
      setPhone(docSnap.data().phoneNo);
      setRoll(docSnap.data().studentId);
    };

    getUserData();
  }, []);

  const [offers, setOffers] = useState([]);
  const [myOffers, setMyOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loansCollection = collection(db, `offers`);
      const loansSnapshot = await getDocs(loansCollection);
      let acceptedStatus = false;
      let loanData = await Promise.all(
        loansSnapshot.docs.map(async (e) => {
          const obj = e.data();

          if (obj.requesterUid !== currentUser.uid) return null;

          if (obj.status === "accepted") {
            acceptedStatus = true;
          }

          const offererRef = doc(collection(db, "users"), obj.uid);
          const offererDoc = await getDoc(offererRef);
          const offererData = offererDoc.data();

          return {
            id: e.id,
            requesterUid: obj.requesterUid,
            offererUid: obj.uid,
            offererEmail: offererData.email,
            offererPhone: offererData.phoneNo,
            offererName: offererData.displayName,
            offererStudentId: offererData.studentId,
            date: obj.date,
            interestRate: obj.interestRate,
            note: obj.note,
            status: obj.status,
          };
        })
      );
      // remove null values
      loanData = loanData.filter((elem) => elem !== null);
      setOfferAccepted(acceptedStatus);
      setOffers(loanData);
      console.log("offers set", loanData);
    };
    fetchData();
  }, []);

  // get data for the offers i made
  useEffect(() => {
    const fetchData = async () => {
      const loansCollection = collection(db, `offers`);
      const loansSnapshot = await getDocs(loansCollection);
      let loanData = await Promise.all(
        loansSnapshot.docs.map(async (e) => {
          const obj = e.data();

          if (obj.uid !== currentUser.uid) return null;

          const requesterRef = doc(collection(db, "users"), obj.requesterUid);
          const requesterDoc = await getDoc(requesterRef);
          const requesterData = requesterDoc.data();

          return {
            id: e.id,
            requesterUid: obj.requesterUid,
            offererUid: obj.uid,
            requesterEmail: requesterData.email,
            requesterPhone: requesterData.phoneNo,
            requesterName: requesterData.displayName,
            requesterStudentId: requesterData.studentId,
            date: obj.date,
            interestRate: obj.interestRate,
            note: obj.note,
            status: obj.status,
          };
        })
      );
      // remove null values
      loanData = loanData.filter((elem) => elem !== null);
      setMyOffers(loanData);
      console.log("my offers set", loanData);
    };
    fetchData();
  }, []);

  const handleAcceptOffer = async (offerId) => {
    const loansCollection = collection(db, `offers`);
    // change the status of the offer to accepted
    const docRef = doc(loansCollection, offerId);

    // Find the offer first
    const offer = offers.find((elem) => elem.id === offerId);

    if (offer) {
      // Instead of overwriting the entire document, only update the fields you need to change.
      await updateDoc(docRef, {
        ...offer, // Spread all properties of offer (if there are any other properties you want to include)
        status: "accepted",
      });
    } else {
      console.error("Offer not found!");
      return;
    }

    console.log("done");
    setOfferAccepted(true);
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="border p-5">
            <h1 className="text-center">Profile</h1>
            Name: {name}
            <br />
            Phone: {phone}
            <br />
            Roll: {roll}
            <br />
            Email: {email}
            <br />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl">Offers for your loan requests</h1>
          {offers &&
            offers.map((elem) => (
              <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                  <img
                    src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{elem.offererName}</h2>
                  <p>Student ID: {elem.offererStudentId}</p>
                  <p>Email: {elem.offererEmail}</p>
                  <p>Phone: {elem.offererPhone}</p>
                  <p>Interest rate: {elem.interestRate}%</p>
                  <p>Return date: {elem.date}</p>
                  {elem.note && <p>Additional Notes: {elem.note}</p>}
                  <div className="card-actions justify-end">
                    {!offerAccepted && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAcceptOffer(elem.id)}
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h1 className="text-3xl">My offers</h1>
        {myOffers &&
          myOffers.map((elem) => (
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{elem.requesterName}</h2>
                <p>Student ID: {elem.requesterStudentId}</p>
                <p>Email: {elem.requesterEmail}</p>
                <p>Phone: {elem.requesterPhone}</p>
                <p>Interest rate: {elem.interestRate}%</p>
                <p>Return date: {elem.date}</p>
                {elem.note && <p>Additional Notes: {elem.note}</p>}
                <p>Status: {elem.status}</p>
                {elem.status === "accepted" && (
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Pay</button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
