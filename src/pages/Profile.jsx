import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      if (!currentUser.uid) return;
      const userRef = doc(collection(db, "users"), currentUser.uid);

      var docSnap;

      for (let i = 0; i < 5; i++) {
        docSnap = await getDoc(userRef);
        // console.log(i);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.phone) break;
        }
      }
      // console.log(docSnap.data())
      setEmail(docSnap.data().email);
      setName(docSnap.data().displayName);
      setPhone(docSnap.data().phoneNo);
      setRoll(docSnap.data().studentId);
    };
    getUserData();
  }, [currentUser.uid]);


// const [resumes, setResumes] = useState([]);
// useEffect(() => {
//   const fetchData = async () => {
//     if(currentUser.uid){

//       const loansCollection = collection(db, `users/${currentUser.uid}/requests`);
//       console.log(loansCollection)
//       const loansSnapshot = await getDocs(loansCollection);
//       const loanData = loansSnapshot.docs.map((doc) => {
//         const obj = doc.data().data;
//         const parsedObj = JSON.parse(obj);
//         return {
//           uid: parsedObj.uid,
//         };
//       });
//       //   setLoading(false);
//       console.log(loanData)
//       setResumes(loanData);
//     }
//   };
//   fetchData();
// }, []);

const [requests, setRequests] = useState([])

useEffect(() => {
  const fetchData = async () => {
    const loansCollection = collection(db, `users/${currentUser.uid}/requests`);
    const loansSnapshot = await getDocs(loansCollection);
    const loanData = loansSnapshot.docs.map((doc) => {
      const obj = doc.data().data;
      const parsedObj = JSON.parse(obj);
      return {
        uid: parsedObj.uid
      };
    });
    //   setLoading(false);
    setRequests(loanData);
  };
  fetchData();
}, [currentUser.uid]);

console.log(requests)

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
          <h1 className="text-3xl">Requests</h1>
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
