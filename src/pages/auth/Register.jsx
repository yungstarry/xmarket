import React, { useState } from "react";
import styles from "./Auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components";
import registerImg from "../../assets/register.png";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const initialState = {
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password, cpassword } = formData;
  const [isloading, setIsloading] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      toast.error("Passwords do not match");
    }

    setIsloading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setIsloading(false);
        toast.success("Registration Successful");
        navigate("/login")
        
      })
      .catch((error) => {
        
        toast.error(error.message)
        
        setIsloading(false)
        // ..
      });
  };
  return (
    <>
      {isloading && <Loader />}
      <section className={` container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
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
              <input
                type="password"
                name="cpassword"
                value={cpassword}
                placeholder="Confirm Password"
                required
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
              <div className={styles.links}> </div>
            </form>

            <span className={styles.register}>
              <p>Already have an account? </p>
              <Link to={"/login"}> Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width={"400px"} />
        </div>
      </section>
    </>
  );
};

export default Register;
