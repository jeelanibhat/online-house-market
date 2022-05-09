import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { toast } from "react-toastify";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, SetFormData] = useState({
    email: " ",
    password: "",
  });

  const { email, password } = formData;
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
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        toast.success("You have successfully signed up!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Creadentials!");
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
                  Sign In
                </button>
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password
              </Link>
            </div>
          </form>

          {/* Google Auth */}
          <Link to="/sign-up" className="registerLink">
            Sign Up
          </Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
