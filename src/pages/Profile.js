import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const auth = getAuth();
  const [formData, SetFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  // submit
  const handleSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // update in firestore
        const userRefrence = doc(db, "users", auth.currentUser.uid);
        updateDoc(userRefrence, {
          name,
        });
        setTimeout(() => {
          toast.success("User updated successfully!");
        }, 500);
      }
    } catch (error) {
      toast.error("Opps something went wrong!");
    }
  };

  // on change
  const handleChange = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="profile">
      {auth.currentUser ? (
        <header className="profileHeader">
          <h3>My Profile, Welcome {name}!</h3>
          <button type="button" className="logOut" onClick={onLogout}>
            Logout
          </button>
        </header>
      ) : (
        "Not Logged In"
      )}

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && handleSubmit();
              setChangeDetails(!changeDetails);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={changeDetails ? "profileNameActive" : "profileName"}
              disabled={!changeDetails}
              value={name}
              onChange={handleChange}
            />
            <input
              type="text"
              id="email"
              className="profileEmail"
              disabled
              value={email}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
