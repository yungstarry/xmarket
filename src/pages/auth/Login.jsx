import React, { useState } from "react";
import styles from "./Auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { Card } from "../../components";
import Loader from "../../components/loader/Loader";
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectPreviouseURL } from "../../redux/slice/cartSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const previousURL = useSelector(selectPreviouseURL)

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart")
    } else {
      navigate('/')
    }
  }

  const loginUser = (e) => {
    e.preventDefault();
    setIsloading(true);
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        setIsloading(false);
        toast.success("Login Successful");
        redirectUser();
      })
      .catch((error) => {
        setIsloading(false);
        toast.error(error.message);
    });
};

//login with google
const provider = new GoogleAuthProvider();
const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
       
        const user = result.user;
        toast.success("login successful")
redirectUser();      })
      .catch((error) => {
        toast.error(error.message)
        toast.error(error.customData.email)
      
      });
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {isloading && <Loader />}
      <section className={` container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width={"400px"} />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                required
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                required
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                {" "}
                <Link to={"/reset"}>Reset Password</Link>{" "}
              </div>
              <p>-- or --</p>
            </form>
            <button
              onClick={signinWithGoogle}
              className="--btn --btn-danger --btn-block"
            >
              <FaGoogle color="#fff" />
              Login with Google
            </button>

            <span className={styles.register}>
              {" "}
              Don't have an account?<Link to={"/register"}> Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
