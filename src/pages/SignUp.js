import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const inputOnchange = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = await getAuth();
      console.log("auth::", auth);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userCredentials.user;
      console.log("user::", user);

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Opps Something went wrong!");
    }
  };

  return (
    <>
      <div className="pageContainer signInUp__bg">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              className="nameInput"
              onChange={inputOnchange}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              className="emailInput"
              onChange={inputOnchange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                className="passwordInput"
                onChange={inputOnchange}
              />

              <img
                src={visibilityIcon}
                alt=""
                className="showPassword"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="forgot-signInUp-wrap">
              <div className="signInBar">
                <button className="signInButton" type="submit">
                  Register
                </button>
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password
              </Link>
            </div>
          </form>

          {/* Google Auth */}
          <Link to="/sign-in" className="registerLink">
            Sign In
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
